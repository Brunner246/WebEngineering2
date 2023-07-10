// function toggleMode() {
//     fetch('/toggleMode')
//         .then(() => {
//             updateModeIcon();
//             location.reload();
//         })
//         .catch((error) => {
//             console.error('Fehler beim Umschalten des Modus:', error);
//         });
// }
//
// function updateModeIcon() {
//     const toggleModeIcon = document.getElementById('toggleModeIcon');
//     const currentMode = getCurrentMode();
//
//     if (currentMode === 'light') {
//         toggleModeIcon.innerText = '☀';
//     } else {
//         toggleModeIcon.innerText = '🌙';
//     }
// }
//
// function getCurrentMode() {
//     return document.documentElement.getAttribute('data-theme');
// }

function toggleMode() {
    const htmlElement = document.documentElement;
    htmlElement.classList.toggle('dark-mode');
}
