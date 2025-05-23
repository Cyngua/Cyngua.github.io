document.addEventListener('DOMContentLoaded', function() {
    // Get all unique skills from projects
    const skillsSet = new Set();
    document.querySelectorAll('.project-tech-stack span').forEach(skill => {
        skillsSet.add(skill.textContent.trim());
    });

    // Sort skills alphabetically
    const sortedSkills = Array.from(skillsSet).sort();

    // Populate filter tags
    const filterTagsContainer = document.getElementById('filter-tags');
    sortedSkills.forEach(skill => {
        const tag = document.createElement('span');
        tag.className = 'filter-tag';
        tag.textContent = skill;
        tag.addEventListener('click', () => toggleFilter(tag));
        filterTagsContainer.appendChild(tag);
    });

    // Clear filters button
    const clearFiltersBtn = document.getElementById('clear-filters');
    clearFiltersBtn.addEventListener('click', clearFilters);

    // Filter toggle function
    function toggleFilter(tag) {
        tag.classList.toggle('active');
        filterProjects();
    }

    // Clear all filters
    function clearFilters() {
        document.querySelectorAll('.filter-tag').forEach(tag => {
            tag.classList.remove('active');
        });
        filterProjects();
    }

    // Filter projects based on selected skills
    function filterProjects() {
        const selectedSkills = Array.from(document.querySelectorAll('.filter-tag.active'))
            .map(tag => tag.textContent.trim());

        document.querySelectorAll('.detailed-project').forEach(project => {
            const projectSkills = Array.from(project.querySelectorAll('.project-tech-stack span'))
                .map(skill => skill.textContent.trim());

            if (selectedSkills.length === 0 || selectedSkills.some(skill => projectSkills.includes(skill))) {
                project.classList.remove('hidden');
            } else {
                project.classList.add('hidden');
            }
        });
    }
}); 