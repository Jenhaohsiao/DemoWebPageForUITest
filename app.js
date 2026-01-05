document.addEventListener('DOMContentLoaded', () => {
    // UI Elements
    const viewForm = document.getElementById('view-form');
    const viewSuccess = document.getElementById('view-success');
    const form = document.getElementById('member-form');
    const resetBtn = document.getElementById('btn-reset');
    const backBtn = document.getElementById('btn-back');
    const citySelect = document.getElementById('select-city');
    const districtSelect = document.getElementById('select-district');

    const regionalData = {
        taipei: ['Daan', 'Xinyi', 'Neihu', 'Wanhua', 'Zhongshan'],
        taichung: ['Xitun', 'Beitun', 'Nantun', 'Dali', 'Taiping'],
        kaohsiung: ['Zuoying', 'Sanmin', 'Lingya', 'Fengshan', 'Gushan']
    };

    // Dynamic Districts
    citySelect.addEventListener('change', (e) => {
        const city = e.target.value;
        districtSelect.innerHTML = '<option value="">Select District</option>';
        if (city && regionalData[city]) {
            districtSelect.disabled = false;
            regionalData[city].forEach(d => {
                const opt = document.createElement('option');
                opt.value = d.toLowerCase().replace(/\s+/g, '-');
                opt.textContent = d;
                districtSelect.appendChild(opt);
            });
        } else {
            districtSelect.disabled = true;
        }
    });

    const hideErrors = () => {
        document.querySelectorAll('[id^="error-"]').forEach(el => el.classList.add('hidden'));
    };

    // Actions
    resetBtn.onclick = () => {
        if (confirm('Reset all form fields?')) {
            form.reset();
            districtSelect.disabled = true;
            hideErrors();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    backBtn.onclick = () => {
        form.reset();
        districtSelect.disabled = true;
        hideErrors();
        viewSuccess.classList.add('hidden');
        viewForm.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    form.onsubmit = (e) => {
        e.preventDefault();
        hideErrors();
        
        const data = new FormData(form);
        let isValid = true;

        if (!data.get('username')?.trim()) {
            document.getElementById('error-username').classList.remove('hidden');
            isValid = false;
        }
        if (!data.get('email')?.includes('@')) {
            document.getElementById('error-email').classList.remove('hidden');
            isValid = false;
        }
        if (!data.get('dob')) {
            document.getElementById('error-dob').classList.remove('hidden');
            isValid = false;
        }
        if (!data.get('plan')) {
            document.getElementById('error-plan').classList.remove('hidden');
            isValid = false;
        }
        if (!data.get('agree')) {
            document.getElementById('error-agree').classList.remove('hidden');
            isValid = false;
        }

        if (isValid) {
            // Populate summary
            document.getElementById('result-username').textContent = data.get('username');
            document.getElementById('result-email').textContent = data.get('email');
            document.getElementById('result-plan').textContent = data.get('plan');
            const city = citySelect.options[citySelect.selectedIndex].text;
            const dist = districtSelect.options[districtSelect.selectedIndex]?.text || 'N/A';
            document.getElementById('result-location').textContent = citySelect.value ? `${city}, ${dist}` : 'None';
            document.getElementById('result-interests').textContent = data.getAll('interests').join(', ') || 'None';
            document.getElementById('result-bio').textContent = data.get('bio') || 'N/A';

            viewForm.classList.add('hidden');
            viewSuccess.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
});