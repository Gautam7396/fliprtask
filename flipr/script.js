document.addEventListener('DOMContentLoaded', () => {
    const yearFilter = document.getElementById('yearFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const prizeList = document.getElementById('prizeList');
    const multipleTimeLaureates = document.getElementById('multipleTimeLaureates');

    async function fetchNobelPrizes() {
        try {
            const response = await fetch('http://api.nobelprize.org/v1/prize.json');
            const data = await response.json();
            return data.prizes;
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    }

    function populateFilters(prizes) {
        const years = [...new Set(prizes.map(prize => prize.year))].sort((a, b) => b - a);
        years.forEach(year => {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearFilter.appendChild(option);
        });

        const categories = [...new Set(prizes.map(prize => prize.category))];
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        }
        );
    }

    function displayPrizes(prizes) {
        prizeList.innerHTML = '';
        prizes.forEach(prize => {
            const prizeElement = document.createElement('div');
            prizeElement.innerHTML = `
                <h2>${prize.year} - ${prize.category}</h2>
                <p>Motivation: ${prize.motivation}</p>
                <ul>
                    ${prize.laureates.map(laureate => `<li>${laureate.firstname} ${laureate.surname}</li>`).join('')}
                </ul>
            `;
            prizeList.appendChild(prizeElement);
        });
    }

    async function main() {
        const prizes = await fetchNobelPrizes();
        populateFilters(prizes);

        yearFilter.addEventListener('change', () => {
            const selectedYear = yearFilter.value;
            const selectedCategory = categoryFilter.value;
            const filteredPrizes = prizes.filter(prize =>
                (!selectedYear || prize.year === parseInt(selectedYear)) &&
                (!selectedCategory || prize.category === selectedCategory)
            );
            displayPrizes(filteredPrizes);
        });

        categoryFilter.addEventListener('change', () => {
            const selectedYear = yearFilter.value;
            const selectedCategory = categoryFilter.value;
            const filteredPrizes = prizes.filter(prize =>
                (!selectedYear || prize.year === parseInt(selectedYear)) &&
                (!selectedCategory || prize.category === selectedCategory)
            );
            displayPrizes(filteredPrizes);
        });
    }

    main();
});
