document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        
        // Toggle the display
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
        
        // Optional: Toggle the + / - sign
        const icon = header.querySelector('span');
        icon.textContent = content.style.display === "block" ? "-" : "+";
    });
});

const track = document.querySelector('.review-track');

// Simple auto-scroll effect
let isDown = false;
let startX;
let scrollLeft;

track.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
});

track.addEventListener('mouseleave', () => { isDown = false; });
track.addEventListener('mouseup', () => { isDown = false; });

track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 2; 
    track.scrollLeft = scrollLeft - walk;
});

document.querySelectorAll('.accordion-header').forEach(button => {
    button.addEventListener('click', () => {
        const panel = button.nextElementSibling;
        const icon = button.querySelector('.icon');

        // Toggle panel height
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
            panel.style.paddingBottom = "0";
            icon.textContent = "+";
        } else {
            // Close other open panels (optional)
            document.querySelectorAll('.accordion-panel').forEach(p => {
                p.style.maxHeight = null;
                p.previousElementSibling.querySelector('.icon').textContent = "+";
            });
            
            panel.style.maxHeight = panel.scrollHeight + "px";
            panel.style.paddingBottom = "20px";
            icon.textContent = "-";
        }
    });
});