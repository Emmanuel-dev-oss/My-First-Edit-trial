const navItems = document.querySelectorAll('.nav-item');
const editSection = document.querySelector('.edit-section');
const editText = document.getElementById('edit-text');
const editForm = document.getElementById('edit-form');
const savedDescriptionsList = document.querySelector('#saved-descriptions ul');

let currentSection = null;
let savedDescriptions = {}; // Object to store saved descriptions for each section


// Function to show the edit section
function showEditSection() {
    editSection.classList.add('show');
    editText.value = ''; // Clear the textarea
}

// Function to hide the edit section
function hideEditSection() {
    editSection.classList.remove('show');
}

// Function to update the content of a section
function updateSectionContent(sectionId, newContent) {
    const section = document.getElementById(sectionId);
    section.querySelector('p').textContent = newContent;
    // hideEditSection();

    // Add or update the saved description
    if (savedDescriptions[sectionId]) {
        savedDescriptions[sectionId].push(newContent); // Add to existing array
    } else {
        savedDescriptions[sectionId] = [newContent]; // Create a new array
    }
    updateSavedDescriptions();
}

// Function to update the displayed saved descriptions
function updateSavedDescriptions() {
    savedDescriptionsList.innerHTML = '';
    for (const sectionId in savedDescriptions) {
        const descriptions = savedDescriptions[sectionId];
        descriptions.forEach(description => {
            const listItem = document.createElement('li');
            listItem.textContent = description;
            savedDescriptionsList.appendChild(listItem);
        });
    }
}

// Event listener for edit form submission
editForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const newContent = editText.value.substring(0, 1000); // Limit to 1000 characters
    updateSectionContent(currentSection, newContent);
    editText.value = ''; // Clear the textarea
});

// Event listeners for navigation items
navItems.forEach(item => {
    item.addEventListener('click', () => {
        const sectionId = item.dataset.section;
        currentSection = sectionId;

        // Show the corresponding section
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            section.style.display = section.id === sectionId ? 'block' : 'none';
        });
    });

    // Show the edit icon on hover
    item.addEventListener('click', showEditSection);

    // Hide the edit icon on mouseout
    // item.addEventListener('mouseout', hideEditSection);
});

// Initial update of saved descriptions
updateSavedDescriptions();