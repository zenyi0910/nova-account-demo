// Maintenance Date Picker
let maintDatePickerTarget = null;

function openMaintDatePicker(target) {
  maintDatePickerTarget = target;
  const input = document.createElement('input');
  input.type = 'datetime-local';
  input.style.position = 'absolute';
  input.style.opacity = '0';
  input.style.pointerEvents = 'none';
  
  const existingVal = document.getElementById(target === 'start' ? 'schedStartDate' : 'schedEndDate').value;
  if (existingVal) {
    input.value = existingVal;
  }
  
  document.body.appendChild(input);
  input.focus();
  input.click();
  
  input.addEventListener('change', function() {
    if (this.value) {
      const displayId = target === 'start' ? 'schedStartDisplay' : 'schedEndDisplay';
      const hiddenId = target === 'start' ? 'schedStartDate' : 'schedEndDate';
      const dt = new Date(this.value);
      document.getElementById(displayId).textContent = dt.toLocaleString('zh-TW', { 
        year: 'numeric', month: 'numeric', day: 'numeric', 
        hour: '2-digit', minute: '2-digit' 
      });
      document.getElementById(hiddenId).value = this.value;
    }
    document.body.removeChild(this);
  });
  
  input.addEventListener('blur', function() {
    setTimeout(() => {
      if (document.body.contains(this)) {
        document.body.removeChild(this);
      }
    }, 200);
  });
}
