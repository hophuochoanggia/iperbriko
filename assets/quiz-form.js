const fieldMapper = {
  step1: {
    "#s_1_row_1_rb_0": "Check Box5",
    "#s_1_row_1_rb_1": "Check Box6",
    "#s_1_row_1_rb_2": "Check Box7",
    "#s_1_row_1_rb_3": "Check Box8",
    "#s_1_row_2_rb_0": "Check Box9",
    "#s_1_row_2_rb_1": "Check Box10",
    "#s_1_row_2_rb_2": "Check Box11",
    "#s_1_row_2_rb_3": "Check Box12",
    "#s_1_row_3_rb_0": "Check Box13",
    "#s_1_row_3_rb_1": "Check Box14",
    "#s_1_row_3_rb_2": "Check Box15",
    "#s_1_row_3_rb_3": "Check Box16",
    "#s_1_row_4_rb_0": "Check Box17",
    "#s_1_row_4_rb_1": "Check Box18",
    "#s_1_row_4_rb_2": "Check Box19",
    "#s_1_row_4_rb_3": "Check Box20",
    "#s_1_row_5_rb_0": "Check Box21",
    "#s_1_row_5_rb_1": "Check Box22",
    "#s_1_row_5_rb_2": "Check Box23",
    "#s_1_row_5_rb_3": "Check Box24",
    "#s_1_row_6_rb_0": "Check Box25",
    "#s_1_row_6_rb_1": "Check Box28",
    "#s_1_row_6_rb_2": "Check Box31",
    "#s_1_row_6_rb_3": "Check Box34",
    "#s_1_row_7_rb_0": "Check Box26",
    "#s_1_row_7_rb_1": "Check Box29",
    "#s_1_row_7_rb_2": "Check Box32",
    "#s_1_row_7_rb_3": "Check Box35",
    "#s_1_row_8_rb_0": "Check Box27",
    "#s_1_row_8_rb_1": "Check Box30",
    "#s_1_row_8_rb_2": "Check Box33",
    "#s_1_row_8_rb_3": "Check Box36",
  },
  stopbang: {
    "#s_2_row_1_rb_1": "Check Box37",
    "#s_2_row_2_rb_1": "Check Box38",
    "#s_2_row_3_rb_1": "Check Box39",
    "#s_2_row_4_rb_1": "Check Box40",
    "#s_2_row_5_rb_1": "Check Box41",
    "#s_2_row_6_rb_1": "Check Box42",
    "#s_2_row_7_rb_1": "Check Box43",
    "#s_2_row_8_rb_1": "Check Box44",
    "#s_2_row_1_rb_0": "Check Box45",
    "#s_2_row_2_rb_0": "Check Box46",
    "#s_2_row_3_rb_0": "Check Box47",
    "#s_2_row_4_rb_0": "Check Box49",
    "#s_2_row_5_rb_0": "Check Box50",
    "#s_2_row_6_rb_0": "Check Box51",
    "#s_2_row_7_rb_0": "Check Box52",
    "#s_2_row_8_rb_0": "Check Box53",
  },
  osa: {
    "#s_3_row_1_rb_3": "Check Box54",
    "#s_3_row_2_rb_3": "Check Box55",
    "#s_3_row_3_rb_2": "Check Box56",
    "#s_3_row_4_rb_2": "Check Box57",
  },
  text: {
    ".step2_total": "High",
    ".step-3-total--shop_bang":
      "TOTAL SCORE Patient must score  3 for Medicare subsidy",
    ".step-3-total--osa":
      "2TOTAL SCORE Patient must score  5 for Medicare subsidy",
  },
  input: {
    "#name-feild": "First Name",
    "#phone-feild": "Tel Home",
  },
};

if (document.getElementById("quiz-form")) {
  const step3Selector = document.querySelectorAll(
    'input[name="step3_selector"]',
  );

  if (step3Selector) {
    var radios = document.querySelectorAll(".step3_selector");
    radios.forEach(function (radio) {
      radio.addEventListener("change", function () {
        //show total points
        var totalPoints = document.getElementById("step3_total_container");
        totalPoints.classList.remove("hidden");
        // Reset styles of all labels
        var labels = document.querySelectorAll(".form-check-label");
        labels.forEach(function (label) {
          label.style.backgroundColor = "#F8F8F8";
          label.style.borderColor = "#C7CCD6";
        });
        // Apply active styles to selected radio button's label
        if (this.checked) {
          var label = document.querySelector('label[for="' + this.id + '"]');
          label.style.backgroundColor = "#FFF7DD";
          label.style.borderColor = "#FECD44";
        }
      });
    });

    step3Selector.forEach(function (item) {
      item.addEventListener("change", function (e) {
        console.log(e.target.value);
        const tableStep3 = document.querySelectorAll("table.table_step_3");

        tableStep3.forEach(function (table) {
          if (table.classList.contains("table_step_3_" + e.target.value))
            table.classList.remove("hidden");
          else table.classList.add("hidden");
        });

        const selectedValue = e.target.value;
        getTotalPointsSecondSlider(selectedValue);

        const table =
          e.target.value === "stop_bang"
            ? document.getElementById("stop-bang-table")
            : document.getElementById("osa-table");

        table.querySelectorAll("input[type='radio']").forEach(function (radio) {
          radio.addEventListener("change", function (e) {
            let totalPoints = 0;
            table
              .querySelectorAll("input[type='radio']:checked")
              .forEach(function (checked) {
                totalPoints += parseInt(checked.value);
              });

            const totalPointsElement = document.getElementById("step3_total");

            totalPointsElement.innerText = totalPoints;

            if (item.value === "stop_bang") {
              document.getElementById("result_for_step3_stop_bang").innerText =
                totalPoints + " points";
              document.getElementById("result_for_step3_osa").innerText = "N/A";

              if (
                table.querySelectorAll("input[type='radio']:checked").length >=
                8
              ) {
                document
                  .querySelector('.step__button[data-action="step-3"]')
                  .classList.remove("disabled");
              }
            } else if (item.value === "osa") {
              document.getElementById("result_for_step3_stop_bang").innerText =
                "N/A";
              document.getElementById("result_for_step3_osa").innerText =
                totalPoints + " points";

              if (
                table.querySelectorAll("input[type='radio']:checked").length >=
                4
              ) {
                document
                  .querySelector('.step__button[data-action="step-3"]')
                  .classList.remove("disabled");
              }
            }
          });
        });

        document
          .querySelector('.step__button[data-action="step-3"]')
          .classList.add("disabled");
        if (
          e.target.value === "stop_bang" &&
          document
            .getElementById("stop-bang-table")
            .querySelectorAll("input[type='radio']:checked").length >= 8
        ) {
          document
            .querySelector('.step__button[data-action="step-3"]')
            .classList.remove("disabled");
        } else if (
          e.target.value === "osa" &&
          document
            .getElementById("osa-table")
            .querySelectorAll("input[type='radio']:checked").length >= 8
        ) {
          document
            .querySelector('.step__button[data-action="step-3"]')
            .classList.remove("disabled");
        }
      });

      // const table = item.closest(".card").querySelector(".table_step_3");
      // table.querySelectorAll("input[type='radio']").forEach(function (radio) {
      //   radio.addEventListener("change", function (e) {
      //     let totalPoints = 0;
      //     table
      //       .querySelectorAll("input[type='radio']:checked")
      //       .forEach(function (checked) {
      //         totalPoints += parseInt(checked.value);
      //       });
      //     table.querySelector(".step3_total").innerText = totalPoints;

      //     if (item.value === "stop_bang") {
      //       document.getElementById("result_for_step3_stop_bang").innerText =
      //         totalPoints + " points";
      //       document.getElementById("result_for_step3_osa").innerText = "N/A";

      //       if (
      //         table.querySelectorAll("input[type='radio']:checked").length >= 8
      //       ) {
      //         document
      //           .querySelector('.step__button[data-action="step-3"]')
      //           .classList.remove("disabled");
      //       }
      //     } else if (item.value === "osa") {
      //       document.getElementById("result_for_step3_stop_bang").innerText =
      //         "N/A";
      //       document.getElementById("result_for_step3_osa").innerText =
      //         totalPoints + " points";

      //       if (
      //         table.querySelectorAll("input[type='radio']:checked").length >= 4
      //       ) {
      //         document
      //           .querySelector('.step__button[data-action="step-3"]')
      //           .classList.remove("disabled");
      //       }
      //     }
      //   });
      // });
    });
  }

  const tableStep2 = document.getElementById("table_step_2");
  if (tableStep2) {
    tableStep2
      .querySelectorAll("input[type='radio']")
      .forEach(function (radio) {
        radio.addEventListener("change", function (e) {
          let totalPoints = 0;
          tableStep2
            .querySelectorAll("input[type='radio']:checked")
            .forEach(function (checked) {
              totalPoints += parseInt(checked.value);
            });
          document.querySelector(".step2_total").innerText = totalPoints;
          document.querySelector(".result_for_step_2").innerHTML =
            totalPoints + " points";

          if (
            tableStep2.querySelectorAll("input[type='radio']:checked").length >=
            8
          ) {
            document
              .querySelector('.step__button[data-action="step-2"]')
              .classList.remove("disabled");
          }
        });
      });
  }
}

function getTotalPointsSecondSlider(selectedValue) {
  let totalPoints = 0;
  const tables = document.querySelectorAll(
    "table.table_step_3_" + selectedValue,
  );
  if (tables.length)
    tables[0]
      .querySelectorAll("input[type='radio']:checked")
      .forEach(function (item) {
        totalPoints += parseInt(item.value);
      });

  document.querySelector(".step3_total").innerText = totalPoints;
  if (selectedValue === "stop_bang") {
    document.getElementById("result_for_step3_stop_bang").innerText =
      totalPoints + " points";
    document.getElementById("result_for_step3_osa").innerText = "N/A";
  } else {
    document.getElementById("result_for_step3_stop_bang").innerText = "N/A";
    document.getElementById("result_for_step3_osa").innerText =
      totalPoints + " points";
  }
}

function switchSlider(step) {
  let target = document.getElementById("quiz-form");
  window.scrollTo({ top: target.offsetTop - 50, behavior: "smooth" });

  let progressBg2 = document.getElementById("progress-bg-2");
  let progressBorder2 = document.getElementById("progress-border-2");
  let progressTick2 = document.getElementById("progress-tick-2");
  let progressBar2 = document.getElementById("progress-bar-2");

  let progressBg3 = document.getElementById("progress-bg-3");
  let progressBorder3 = document.getElementById("progress-border-3");
  let progressTick3 = document.getElementById("progress-tick-3");

  if (step == 1) {
    // step 1 is default
    document.querySelectorAll(".quiz-form__step").forEach(function (item) {
      if (item.id.includes("step-1")) item.classList.remove("hidden");
      else item.classList.add("hidden");
    });
  }
  if (step == 2) {
    document.querySelectorAll(".quiz-form__step").forEach(function (item) {
      if (item.id.includes("step-2")) item.classList.remove("hidden");
      else item.classList.add("hidden");
    });
    document.getElementById("progress").classList.remove("hidden");
    progressBg2.style.display = "block";
    progressBg2.style.backgroundColor = "#FECD44";
    progressBorder2.style.borderColor = "#FECD44";
    progressBar2.style.borderColor = "#FECD44";

    progressBorder2.style.backgroundColor = "#FFF";
    progressTick2.classList.add("hidden");

    progressBorder3.style.backgroundColor = "#FFF";
    progressBg3.style.backgroundColor = "#FFF";
    progressTick3.classList.add("hidden");
  }
  if (step == 3) {
    document.querySelectorAll(".quiz-form__step").forEach(function (item) {
      if (item.id.includes("step-3")) item.classList.remove("hidden");
      else item.classList.add("hidden");
    });
    document.getElementById("progress").classList.remove("hidden");
    progressBg3.style.backgroundColor = "#FECD44";
    progressBorder3.style.borderColor = "#FECD44";

    progressBorder2.style.backgroundColor = "#FECD44";
    progressBg2.style.display = "none";
    progressTick2.classList.remove("hidden");

    var selectors = document.querySelectorAll(".step3_selector");
    selectors.forEach(function (selector) {
      selector.addEventListener("change", function () {
        console.log("change");
        var tables = document.querySelectorAll(".table_step_3");
        tables.forEach(function (table) {
          table.classList.add("hidden");
        });
        if (this.value === "stop_bang") {
          var tableStopBang = document.querySelector(".table_step_3_stop_bang");
          tableStopBang.classList.remove("hidden");
        } else if (this.value === "osa") {
          var tableOsa = document.querySelector(".table_step_3_osa");
          tableOsa.classList.remove("hidden");
        }
      });
    });
    if (parseInt(document.querySelector(".step2_total").textContent) < 8) {
      switchSlider(4);
    }
  }
  if (step == 4) {
    progressBorder3.style.backgroundColor = "#FECD44";
    progressBg3.style.display = "none";
    progressTick3.classList.remove("hidden");

    document.querySelectorAll(".quiz-form__step").forEach(function (item) {
      if (item.id.includes("step-4")) item.classList.remove("hidden");
      else item.classList.add("hidden");
    });
    const step3SelectorValue = document.querySelector(
      ".step3_selector:checked",
    )?.value;

    const shopbang = parseInt(
      document.querySelector(".step-3-total--shop_bang").innerText,
    );
    const osa = parseInt(
      document.querySelector(".step-3-total--osa").innerText,
    );

    const enligibleCondition =
      parseInt(document.querySelector(".step2_total").innerText) >= 8 &&
      ((shopbang >= 3 && step3SelectorValue === "stop_bang") ||
        (osa >= 5 && step3SelectorValue === "osa"));

    document
      .querySelector(".card-primary-block")
      .classList.add(enligibleCondition ? "card_eligible" : "card_ineligible");
    document.querySelector(".card-primary-block .h2").innerText =
      enligibleCondition
        ? "You may be eligible for a Sleep Study"
        : "Based on your answers, a sleep study might not be the best option";
    document
      .querySelector(".footer_card_eligible")
      .classList.add(!enligibleCondition ? "hidden" : "visible");
    document
      .querySelector(".shopify-section.py-collection-products")
      .classList.remove("hidden");

    document.querySelector(
      ".grid__item.submit-form .quiz_slider_heading h3",
    ).innerHTML = enligibleCondition
      ? "Email me the referral form"
      : "Request a consultation";

    document.getElementById("progress").classList.add("hidden");
    document.getElementById("progress-bar").style.width = "100%";
  }
}

async function formSubmit(e) {
  e.preventDefault();
  const form = document.getElementById("info-form");

  const step3SelectorValue = document.querySelector(
    ".step3_selector:checked",
  )?.value;

  const shopbang = parseInt(
    document.querySelector(".step-3-total--shop_bang").innerText,
  );
  const osa = parseInt(document.querySelector(".step-3-total--osa").innerText);

  const isEnligible =
    parseInt(document.querySelector(".step2_total").innerText) >= 8 &&
    ((shopbang >= 3 && step3SelectorValue === "stop_bang") ||
      (osa >= 5 && step3SelectorValue === "osa"));

  const fields = await getAssessmentResult();

  const payload = {
    platform: "cpap",
    email: form.querySelector('[name="email"]').value,
    firstName: form.querySelector('[name="firstName"]').value,
    lastName: form.querySelector('[name="lastName"]').value,
    phone: form.querySelector('[name="phone"]').value,
    adminEmail: form.querySelector('[name="adminEmail"]').value,
    senderEmail: form.querySelector('[name="senderEmail"]').value,
    fields: fields,
    success: isEnligible,
  };

  await fetch("https://e9-utilities.vercel.app/api/assessment-result", {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
      // "Authentication": grecaptcha.getResponse()
    },
    body: JSON.stringify(payload),
  });

  form.querySelector('[name="email"]').value = "";
  form.querySelector('[name="firstName"]').value = "";
  form.querySelector('[name="phone"]').value = "";
  form.querySelector('[name="lastName"]').value = "";
  form
    .querySelector(".form-status.form-status-list")
    .classList.remove("hidden");
}

async function getAssessmentResult() {
  const step3SelectorValue = document.querySelector(
    ".step3_selector:checked",
  )?.value;
  const isStopbang =
    step3SelectorValue === "stop_bang" &&
    document.querySelector(".step-3-total--shop_bang").innerText !== "0";
  const isOsa =
    step3SelectorValue === "osa" &&
    document.querySelector(".step-3-total--osa").innerText !== "0";

  const payload = [];

  Object.keys(fieldMapper.step1).forEach((key) => {
    if (document.querySelector(key).checked) {
      payload.push({
        field: fieldMapper.step1[key],
        value: document.querySelector(key).checked,
        type: "checkbox",
      });
    }
  });

  payload.push({
    field: "High",
    value: document.querySelector(".step2_total").innerText,
    type: "text",
  });

  if (isStopbang) {
    Object.keys(fieldMapper.stopbang).forEach((key) => {
      if (document.querySelector(key).checked) {
        payload.push({
          field: fieldMapper.stopbang[key],
          value: document.querySelector(key).checked,
          type: "checkbox",
        });
      }
    });
    if (document.querySelector(".step-3-total--shop_bang")) {
      payload.push({
        field: "TOTAL SCORE Patient must score  3 for Medicare subsidy",
        value: document.querySelector(".step-3-total--shop_bang").innerText,
        type: "text",
      });
    }
  }

  if (isOsa) {
    Object.keys(fieldMapper.osa).forEach((key) => {
      if (document.querySelector(key).checked) {
        payload.push({
          field: fieldMapper.osa[key],
          value: document.querySelector(key).checked,
          type: "checkbox",
        });
      }
    });
    if (document.querySelector(".step-3-total--osa")) {
      payload.push({
        field: "2TOTAL SCORE Patient must score  5 for Medicare subsidy",
        value: document.querySelector(".step-3-total--osa").innerText,
        type: "text",
      });
    }
  }

  return payload;
}

async function handleFillablePDF() {
  const step3SelectorValue = document.querySelector(
    ".step3_selector:checked",
  )?.value;
  const isStopbang =
    step3SelectorValue === "stop_bang" &&
    document.querySelector(".step-3-total--shop_bang").innerText !== "0";
  const isOsa =
    step3SelectorValue === "osa" &&
    document.querySelector(".step-3-total--osa").innerText !== "0";

  const formUrl =
    "https://cdn.shopify.com/s/files/1/0622/9511/3954/files/CPAP-Referral-form-FILLABLE.pdf";
  const formPdfBytes = await fetch(formUrl).then((res) => res.arrayBuffer());
  const { PDFDocument } = PDFLib;
  const pdfDoc = await PDFDocument.load(formPdfBytes);
  const form = pdfDoc.getForm();

  Object.keys(fieldMapper.step1).forEach((key) => {
    const field = form.getField(fieldMapper.step1[key]);
    if (document.querySelector(key).checked) {
      field.check();
    }
  });

  const field = form.getField("High");
  if (document.querySelector(".step2_total"))
    field.setText(document.querySelector(".step2_total").innerText);

  if (isStopbang) {
    Object.keys(fieldMapper.stopbang).forEach((key) => {
      const field = form.getField(fieldMapper.stopbang[key]);
      if (document.querySelector(key).checked) {
        field.check();
      }
    });
    const field = form.getField(
      "TOTAL SCORE Patient must score  3 for Medicare subsidy",
    );
    if (document.querySelector(".step-3-total--shop_bang"))
      field.setText(
        document.querySelector(".step-3-total--shop_bang").innerText,
      );
  }

  if (isOsa) {
    Object.keys(fieldMapper.osa).forEach((key) => {
      const field = form.getField(fieldMapper.osa[key]);
      if (document.querySelector(key).checked) {
        field.check();
      }
    });
    const field = form.getField(
      "2TOTAL SCORE Patient must score  5 for Medicare subsidy",
    );
    if (document.querySelector(".step-3-total--osa"))
      field.setText(document.querySelector(".step-3-total--osa").innerText);
  }

  const pdfBytes = await pdfDoc.save();
  download(pdfBytes, "Assessment_Result.pdf", "application/pdf");
}
