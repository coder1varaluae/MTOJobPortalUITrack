/* ####### Habot JS Library ####### */
/* #### Habot 2021 All Right Reserved #### */

/* Check Uploded Job sample & intructions file format */
let isSampleFormatAllowed;
let isInstructionsFormatAllowed;

const malForm = document.getElementById("mal-form");
const mtoForm = document.getElementById("mto-form");

const sampleNotification = document.getElementById("sample-notification");
const instructionsNotification = document.getElementById(
  "instruction-notification"
);
const tcTypeNotification = document.getElementById("tc-type-notification");

const uploadJobSample = document.getElementById("upload-job-sample");
const uploadJobInstructions = document.getElementById(
  "upload-job-instructions"
);

const uploadSampleArea = document.getElementById("upload-sample-area");
const uploadInstructionsArea = document.getElementById(
  "upload-instructions-area"
);

const tcType = document.getElementsByClassName("tc-type")[0];

function screenJobSampleFormat() {
  const ALLOWED_SAMPLE_EXT = ["jpeg", "jpg", "png", "pdf"];

  uploadJobSample.addEventListener(
    "change",
    function() {
      const files = this.files;
      let FILE_EXT;
      filesLength = files.length;
      for (let i = 0; i < filesLength; i++) {
        FILE_EXT = files[i].name.split(".");
        FILE_EXT = FILE_EXT[FILE_EXT.length - 1].toLowerCase();
        if (ALLOWED_SAMPLE_EXT.includes(FILE_EXT)) {
          isSampleFormatAllowed = true;
          uploadSampleArea.value = files[i].name;
          sampleNotification.style.display = "none";
        } else {
          isSampleFormatAllowed = false;
          sampleNotification.style.display = "block";
        }
      }
    },
    false
  );
}
screenJobSampleFormat();

function screenJobInstructionFormat() {
  const ALLOWED_INSTRCUTIONS_EXT = ["jpeg", "jpg", "png", "pdf"];

  uploadJobInstructions.addEventListener(
    "change",
    function() {
      const files = this.files;
      let FILE_EXT;
      filesLength = files.length;
      for (let i = 0; i < filesLength; i++) {
        FILE_EXT = files[i].name.split(".");
        FILE_EXT = FILE_EXT[FILE_EXT.length - 1].toLowerCase();
        if (ALLOWED_INSTRCUTIONS_EXT.indexOf(FILE_EXT) !== -1) {
          isInstructionsFormatAllowed = true;
          uploadInstructionsArea.value = files[i].name;
          instructionsNotification.style.display = "none";
        } else {
          isInstructionsFormatAllowed = false;
          instructionsNotification.style.display = "block";
        }
      }
    },
    false
  );
}
screenJobInstructionFormat();

/* Validate MAL Form before Submission */
function validateMALForm() {
  if (!isSampleFormatAllowed) {
    sampleNotification.style.display = "block";
  } else if (!isInstructionsFormatAllowed) {
    instructionsNotification.style.display = "block";
  } else {
    malForm.action = "mal.py";
    malForm.submit();
    sampleNotification.style.display = "none";
    instructionsNotification.style.display = "none";
  }
}

/* Validate MTO Form before Submission */
function validateMTOForm() {
  if (tcType.value === "TC") {
    tcTypeNotification.style.display = "block";
  } else if (!isSampleFormatAllowed) {
    sampleNotification.style.display = "block";
  } else if (!isInstructionsFormatAllowed) {
    instructionsNotification.style.display = "block";
  } else {
    mtoForm.action = "mto.py";
    mtoForm.submit();
    sampleNotification.style.display = "none";
    instructionsNotification.style.display = "none";
    tcTypeNotification.style.display = "none";
  }
}

/* MTO Form Custom Select  */
var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
      /* When an item is clicked, update the original select box,
        and the selected item: */
      var y, i, k, s, h, sl, yl;
      s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      sl = s.length;
      h = this.parentNode.previousSibling;
      for (i = 0; i < sl; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName("same-as-selected");
          yl = y.length;
          for (k = 0; k < yl; k++) {
            y[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          break;
        }
      }
      h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x,
    y,
    i,
    xl,
    yl,
    arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);
