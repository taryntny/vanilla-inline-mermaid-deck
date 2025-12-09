// script.js

let currentContent = {};
let isEditMode = false;
let activeDiagramKey = null;

// Initialize currentContent when DEFAULT_DECK_CONTENT is available
function initializeContent() {
    if (typeof DEFAULT_DECK_CONTENT !== 'undefined') {
        currentContent = JSON.parse(JSON.stringify(DEFAULT_DECK_CONTENT)); // Clone default
        console.log('Content initialized:', Object.keys(currentContent).length, 'slides');
    } else {
        console.error('DEFAULT_DECK_CONTENT not available');
        currentContent = {};
    }
}

// Helper: Get value from object by string path "slide1.title"
function getNestedValue(obj, path) {
    return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined) ? acc[part] : null, obj);
}

// Helper: Set value in object by string path
function setNestedValue(obj, path, value) {
    const parts = path.split('.');
    let current = obj;
    for (let i = 0; i < parts.length - 1; i++) {
        if (!current[parts[i]] || typeof current[parts[i]] !== 'object') {
            current[parts[i]] = {};
        }
        current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value;
}

// 1. Load content from localStorage if it exists
function loadContent() {
    // Always start with default content
    if (typeof DEFAULT_DECK_CONTENT === 'undefined') {
        console.error('DEFAULT_DECK_CONTENT is not available');
        return;
    }
    
    // Initialize with defaults first
    currentContent = JSON.parse(JSON.stringify(DEFAULT_DECK_CONTENT));
    
    // Then try to load saved content and merge it
    const savedContent = localStorage.getItem('mcp_deck_content');
    if (savedContent) {
        try {
            const saved = JSON.parse(savedContent);
            // Deep merge saved content with defaults
            Object.keys(DEFAULT_DECK_CONTENT).forEach(slideKey => {
                if (saved[slideKey]) {
                    // Deep merge nested objects
                    currentContent[slideKey] = deepMerge(
                        DEFAULT_DECK_CONTENT[slideKey],
                        saved[slideKey]
                    );
                }
            });
            console.log('Content merged from localStorage.');
        } catch (e) {
            console.error('Failed to parse saved content. Using default.', e);
            // Already initialized with defaults above
        }
    } else {
        console.log('No saved content, using defaults');
    }
}

// Helper function for deep merging objects
function deepMerge(defaultObj, savedObj) {
    const result = { ...defaultObj };
    for (const key in savedObj) {
        if (savedObj.hasOwnProperty(key)) {
            if (typeof savedObj[key] === 'object' && savedObj[key] !== null && !Array.isArray(savedObj[key]) && typeof defaultObj[key] === 'object' && defaultObj[key] !== null) {
                result[key] = deepMerge(defaultObj[key], savedObj[key]);
            } else {
                result[key] = savedObj[key];
            }
        }
    }
    return result;
}

// 2. Render content to DOM
async function renderContent() {
    // Verify currentContent is initialized
    if (!currentContent || Object.keys(currentContent).length === 0) {
        console.error('currentContent is empty! Cannot render.');
        console.log('DEFAULT_DECK_CONTENT available:', typeof DEFAULT_DECK_CONTENT !== 'undefined');
        if (typeof DEFAULT_DECK_CONTENT !== 'undefined') {
            currentContent = JSON.parse(JSON.stringify(DEFAULT_DECK_CONTENT));
            console.log('Re-initialized currentContent from DEFAULT_DECK_CONTENT');
        } else {
            return;
        }
    }
    
    // Text
    const elements = document.querySelectorAll('[data-content-key]');
    let renderedCount = 0;
    let missingCount = 0;
    const missingKeys = [];
    
    elements.forEach(el => {
        const key = el.getAttribute('data-content-key');
        if (!key) return;
        
        const content = getNestedValue(currentContent, key);
        if (content !== null && content !== undefined && content !== '') {
            // Convert to string if needed and set content
            el.innerHTML = String(content);
            renderedCount++;
        } else {
            missingCount++;
            missingKeys.push(key);
        }
    });
    
    console.log(`Rendered ${renderedCount} content elements`);
    if (missingCount > 0) {
        console.warn(`${missingCount} content elements not found. First 10:`, missingKeys.slice(0, 10));
        // Log a sample of what's in currentContent
        if (missingCount > 5) {
            console.log('Sample of currentContent keys:', Object.keys(currentContent).slice(0, 5));
        }
    }

    // Diagrams
    const diagramNodes = [];
    document.querySelectorAll('[data-diagram-key]').forEach(container => {
        const key = container.getAttribute('data-diagram-key');
        const diagramCode = getNestedValue(currentContent, key);
        
        if (diagramCode) {
            container.innerHTML = `<div class="mermaid">${diagramCode}</div>`;
            diagramNodes.push(container.querySelector('.mermaid'));
        }
    });

    if (diagramNodes.length > 0) {
        try {
            await mermaid.run({ nodes: diagramNodes });
        } catch (err) {
            console.error("Mermaid rendering failed:", err);
        }
    }
}

// 3. Save to LocalStorage
function saveContent() {
    try {
        document.querySelectorAll('[data-content-key]').forEach(el => {
            if (el.isContentEditable) { 
                 const key = el.getAttribute('data-content-key');
                 setNestedValue(currentContent, key, el.innerHTML);
            }
        });
        localStorage.setItem('mcp_deck_content', JSON.stringify(currentContent));
    } catch (e) {
        console.error('Error saving:', e);
    }
}

// --- Editor Logic ---
function openMermaidEditor(key) {
    activeDiagramKey = key;
    document.getElementById('mermaidCode').value = getNestedValue(currentContent, activeDiagramKey);
    document.getElementById('mermaidEditor').classList.add('open');
    document.getElementById('mermaidEditor').classList.remove('hidden');
}

function closeMermaidEditor() {
    document.getElementById('mermaidEditor').classList.remove('open');
    document.getElementById('mermaidEditor').classList.add('hidden');
    activeDiagramKey = null;
}

function applyMermaidChanges() {
    const newCode = document.getElementById('mermaidCode').value;
    setNestedValue(currentContent, activeDiagramKey, newCode);
    saveContent();
    renderContent();
    closeMermaidEditor();
}

function toggleEditMode() {
    isEditMode = !isEditMode;
    const toggleButton = document.getElementById('editModeToggle');
    const saveTools = document.getElementById('saveTools');

    document.querySelectorAll('[data-content-key]').forEach(el => {
        if (isEditMode) {
            el.setAttribute('contentEditable', 'true');
            el.addEventListener('input', saveContent);
        } else {
            el.removeAttribute('contentEditable');
            el.removeEventListener('input', saveContent);
        }
    });

    document.querySelectorAll('[data-diagram-key]').forEach(el => {
        if (isEditMode) el.classList.add('editable');
        else el.classList.remove('editable');
    });

    if (isEditMode) {
        toggleButton.textContent = 'Exit Edit Mode (Saving...)';
        toggleButton.classList.add('on');
        toggleButton.classList.remove('off');
        saveTools.classList.remove('hidden');
    } else {
        saveContent();
        toggleButton.textContent = 'Enter Edit Mode';
        toggleButton.classList.remove('on');
        toggleButton.classList.add('off');
        saveTools.classList.add('hidden');
    }
}

// Initialization
window.onload = function () {
    // Initialize content first
    initializeContent();
    
    // Verify content is loaded
    if (typeof DEFAULT_DECK_CONTENT === 'undefined' || Object.keys(currentContent).length === 0) {
        console.error('DEFAULT_DECK_CONTENT is not defined. Make sure content.js is loaded before script.js');
        // Try again after a short delay in case of script loading order issues
        setTimeout(() => {
            initializeContent();
            if (Object.keys(currentContent).length > 0) {
                loadContent();
                renderContent();
                setupEventListeners();
            }
        }, 100);
        return;
    }
    
    mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        securityLevel: 'loose',
        fontFamily: 'Inter',
        flowchart: { useMaxWidth: true, htmlLabels: true }
    });
    
    loadContent();
    renderContent();
    setupEventListeners();

    // Nav Dots
    const sections = document.querySelectorAll('section');
    const dotsContainer = document.getElementById('navDots');
    sections.forEach((section, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.title = `Slide ${index + 1}`;
        dot.onclick = () => section.scrollIntoView({ behavior: 'smooth' });
        dotsContainer.appendChild(dot);
    });

    // Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(sections).indexOf(entry.target);
                document.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
                if (document.querySelectorAll('.dot')[index]) {
                    document.querySelectorAll('.dot')[index].classList.add('active');
                }
            }
        });
    }, { root: null, rootMargin: '0px', threshold: 0.5 });
    sections.forEach(section => observer.observe(section));
}

function setupEventListeners() {
    // Listeners
    const editToggle = document.getElementById('editModeToggle');
    if (editToggle) {
        editToggle.addEventListener('click', toggleEditMode);
    }
    
    const copyButton = document.getElementById('copyContentButton');
    if (copyButton) {
        copyButton.addEventListener('click', () => {
            saveContent(); 
            const contentToCopy = JSON.stringify(currentContent, null, 2);
            const tempTextArea = document.createElement('textarea');
            tempTextArea.value = contentToCopy;
            document.body.appendChild(tempTextArea);
            tempTextArea.select();
            document.execCommand('copy');
            document.body.removeChild(tempTextArea);
            
            const statusEl = document.getElementById('copyStatus');
            if (statusEl) {
                statusEl.classList.remove('hidden');
                setTimeout(() => statusEl.classList.add('hidden'), 3000);
            }
        });
    }

    document.querySelectorAll('[data-diagram-key]').forEach(container => {
        container.addEventListener('click', (e) => {
            if (isEditMode) {
                openMermaidEditor(container.getAttribute('data-diagram-key'));
                e.stopPropagation();
            }
        });
    });

    const applyBtn = document.getElementById('applyMermaidChanges');
    if (applyBtn) {
        applyBtn.addEventListener('click', applyMermaidChanges);
    }
    
    const closeBtn = document.getElementById('closeMermaidEditor');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeMermaidEditor);
    }
};

