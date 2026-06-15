document.addEventListener("DOMContentLoaded", () => {
  const ebfq3Triggers =
    document.querySelectorAll(
      ".ebfq2-item"
    )


  ebfq3Triggers.forEach(
    trigger => {

      trigger.addEventListener(
        "click",
        () => {

          const expanded =
            trigger.getAttribute(
              "aria-expanded"
            )


          ebfq3Triggers.forEach(
            item =>
              item.setAttribute(
                "aria-expanded",
                "false"
              )
          )


          if (
            expanded === "false"
          ) {

            trigger.setAttribute(
              "aria-expanded",
              "true"
            )

          }

        }
      )

    }
  )
})