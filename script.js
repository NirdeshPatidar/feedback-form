
// ----------------------
// ⭐ STAR RATING
// ----------------------
const stars = document.querySelectorAll('.star');
const starsLabel = document.getElementById('starsLabel');
let selectedRating = 0;

stars.forEach(s => {
    s.addEventListener('mouseenter', () => highlight(+s.dataset.value));
    s.addEventListener('mouseleave', () => highlight(selectedRating));
    s.addEventListener('click', () => { 
        selectedRating = +s.dataset.value; 
        highlight(selectedRating); 
    });
});

function highlight(n) {
    stars.forEach(s => {
        if (+s.dataset.value <= n) {
            s.style.opacity = '1';
            s.style.color = 'gold';
        } else {
            s.style.opacity = '0.35';
            s.style.color = 'white';
        }
    });
    starsLabel.textContent = n ? (n + ' / 5') : 'Choose 1-5';
}


// ----------------------
// 😍 REACTION CHIPS
// ----------------------
const chips = document.querySelectorAll('.chip');
let selectedReaction = '';

chips.forEach(c => {
    c.addEventListener('click', () => {
        chips.forEach(x => x.classList.remove('selected'));
        c.classList.add('selected');
        selectedReaction = c.dataset.val;
    });
});


// ----------------------
// 📝 FORM SUBMIT
// ----------------------
const form = document.getElementById('feedbackForm');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // ⭐ Validation
    if (!selectedRating) {
        alert("Please give your overall rating.");
        return;
    }
    if (!selectedReaction) {
        alert("Please select your first reaction.");
        return;
    }

    // 🔽 Collect Data
    const data = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        rating: selectedRating,
        expectation: document.getElementById('expectation').value,
        bestPart: document.getElementById('bestPart').value.trim(),
        reaction: selectedReaction,
        emotional: document.querySelector('input[name="emotional"]:checked')?.value,
        serviceRating: document.getElementById('serviceRating').value,
        timing: document.querySelector('input[name="timing"]:checked')?.value,
        recommend: document.querySelector('input[name="recommend"]:checked')?.value,
        improve: document.getElementById('improve').value.trim(),
        message: document.getElementById('message').value.trim(),
        submittedAt: new Date().toISOString()
    };

    // // 📁 Download JSON File
    // const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    // const url = URL.createObjectURL(blob);

    // const a = document.createElement('a');
    // a.href = url;
    // a.download = (data.name ? data.name.replace(/\s+/g, '_') : 'feedback') + '_feedback.json';
    // a.click();
    // URL.revokeObjectURL(url);

    // 🔀 Redirect to Thank You page
    window.location.href = "thankyou.html";
});


// ----------------------
// 🔄 RESET BUTTON
// ----------------------
document.getElementById('resetBtn').addEventListener('click', () => { 
    form.reset();
    selectedRating = 0;
    selectedReaction = "";
    highlight(0);
    chips.forEach(x => x.classList.remove('selected'));
});


// alert box

function showAlert() {
    document.getElementById("customAlert").style.display = "flex";
}
function closeAlert() {
    document.getElementById("customAlert").style.display = "none";
}

// BACKEND

// document.getElementById('feedbackForm').addEventListener('submit', async function(e){
//     e.preventDefault();

//     // Selected star rating
//     let rating = document.querySelector('#stars .star.selected')?.dataset.value || 0;

//     // Selected reaction chip
//     let reaction = document.querySelector('#reactionChips .chip.selected')?.dataset.val || "";

//     // Selected radio buttons
//     let emotional = document.querySelector('input[name="emotional"]:checked')?.value || "";
//     let timing = document.querySelector('input[name="timing"]:checked')?.value || "";
//     let recommend = document.querySelector('input[name="recommend"]:checked')?.value || "";

//     const data = {
//         name: document.getElementById('name').value,
//         email: document.getElementById('email').value,
//         rating: rating,
//         expectation: document.getElementById('expectation').value,
//         bestPart: document.getElementById('bestPart').value,
//         reaction: reaction,
//         emotional: emotional,
//         serviceRating: document.getElementById('serviceRating').value,
//         timing: timing,
//         recommend: recommend,
//         improve: document.getElementById('improve').value,
//         message: document.getElementById('message').value
//     };

//     const response = await fetch('http://127.0.0.1:5000/submit-feedback', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data)
//     });

//     const result = await response.json();
//     alert(result.message);
//     if(result.status === 'success') document.getElementById('feedbackForm').reset();
// });
fetch('http://127.0.0.1:5000/submit-feedback', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    rating: document.getElementById('rating').value,
    expectation: document.getElementById('expectation').value,
    bestPart: document.getElementById('bestPart').value,
    reaction: document.getElementById('reaction').value,
    emotional: document.getElementById('emotional').value,
    serviceRating: document.getElementById('serviceRating').value,
    timing: document.getElementById('timing').value,
    recommend: document.getElementById('recommend').value,
    improve: document.getElementById('improve').value,
    message: document.getElementById('message').value
  })
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));
