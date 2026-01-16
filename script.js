// Estado de la aplicación
const state = {
    currentPage: 1,
    totalPages: 1,
    characters: [],
    favorites: new Set() // Usamos Set para mejor rendimiento en búsquedas
};

// URLs de la API
const API_BASE = 'https://dragonball-api.com/api/characters';

// Referencias a elementos del DOM
const charactersContainer = document.getElementById('characters-container');
const loadingElement = document.getElementById('loading');
const pageInfo = document.getElementById('page-info');
const btnFirst = document.getElementById('btn-first');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const btnLast = document.getElementById('btn-last');

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    loadFavoritesFromStorage();
    loadCharacters(1);
    setupEventListeners();
});

// Cargar favoritos desde LocalStorage
function loadFavoritesFromStorage() {
    const stored = localStorage.getItem('dbz-favorites');
    if (stored) {
        try {
            const favoriteIds = JSON.parse(stored);
            state.favorites = new Set(favoriteIds);
        } catch (error) {
            console.error('Error al cargar favoritos:', error);
            state.favorites = new Set();
        }
    }
}

// Guardar favoritos en LocalStorage
function saveFavoritesToStorage() {
    const favoriteIds = Array.from(state.favorites);
    localStorage.setItem('dbz-favorites', JSON.stringify(favoriteIds));
}

// Configurar event listeners de paginación
function setupEventListeners() {
    btnFirst.addEventListener('click', () => loadCharacters(1));
    btnPrev.addEventListener('click', () => loadCharacters(state.currentPage - 1));
    btnNext.addEventListener('click', () => loadCharacters(state.currentPage + 1));
    btnLast.addEventListener('click', () => loadCharacters(state.totalPages));
}

// Cargar personajes desde la API
async function loadCharacters(page = 1) {
    try {
        showLoading(true);
        const url = `${API_BASE}?page=${page}&limit=10`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        state.currentPage = data.meta.currentPage;
        state.totalPages = data.meta.totalPages;
        state.characters = data.items;
        
        renderCharacters();
        updatePaginationControls();
        updatePageInfo();
    } catch (error) {
        console.error('Error al cargar personajes:', error);
        showError('Error al cargar los personajes. Por favor, inténtalo de nuevo.');
    } finally {
        showLoading(false);
    }
}

// Mostrar/ocultar loading
function showLoading(show) {
    if (show) {
        loadingElement.classList.remove('hidden');
        charactersContainer.innerHTML = '';
    } else {
        loadingElement.classList.add('hidden');
    }
}

// Mostrar error
function showError(message) {
    charactersContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: white; background: rgba(231, 76, 60, 0.8); border-radius: 15px;">
            <h2>❌ Error</h2>
            <p>${message}</p>
        </div>
    `;
}

// Función para obtener el SVG del corazón
function getHeartSVG() {
    return `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
    `;
}

// Renderizar personajes
function renderCharacters() {
    if (state.characters.length === 0) {
        charactersContainer.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: white;">
                <p>No se encontraron personajes.</p>
            </div>
        `;
        return;
    }

    charactersContainer.innerHTML = state.characters.map(character => {
        const isFavorite = state.favorites.has(character.id);
        const favoriteClass = isFavorite ? 'favorite' : 'not-favorite';
        const heartSVG = getHeartSVG();
        
        return `
            <div class="character-card">
                <button class="favorite-btn ${favoriteClass}" 
                        onclick="toggleFavorite(${character.id})" 
                        aria-label="${isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}">
                    ${heartSVG}
                </button>
                <div class="character-image-container">
                    <img src="${character.image || 'https://via.placeholder.com/300x400?text=Sin+imagen'}" 
                         alt="${character.name}" 
                         class="character-image"
                         onerror="this.src='https://via.placeholder.com/300x400?text=Sin+imagen'">
                </div>
                <div class="character-info">
                    <h3 class="character-name">${character.name}</h3>
                    <p class="character-details">
                        <strong>Raza:</strong> ${character.race || 'N/A'}
                    </p>
                    <p class="character-details">
                        <strong>Género:</strong> ${character.gender || 'N/A'}
                    </p>
                </div>
            </div>
        `;
    }).join('');
}

// Toggle favorito
function toggleFavorite(characterId) {
    if (state.favorites.has(characterId)) {
        state.favorites.delete(characterId);
    } else {
        state.favorites.add(characterId);
    }
    
    saveFavoritesToStorage();
    renderCharacters(); // Re-renderizar para actualizar el estado visual
}

// Actualizar controles de paginación
function updatePaginationControls() {
    btnFirst.disabled = state.currentPage === 1;
    btnPrev.disabled = state.currentPage === 1;
    btnNext.disabled = state.currentPage === state.totalPages;
    btnLast.disabled = state.currentPage === state.totalPages;
}

// Actualizar información de página
function updatePageInfo() {
    pageInfo.textContent = `Página ${state.currentPage} de ${state.totalPages}`;
}

// Hacer toggleFavorite accesible globalmente
window.toggleFavorite = toggleFavorite;