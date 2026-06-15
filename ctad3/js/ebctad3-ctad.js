document.addEventListener("DOMContentLoaded", function () {

    const telLinks = document.querySelectorAll('a[href^="tel:"]');

    const popup = document.getElementById("ctad3-qr-popup");

    const qrImage = document.getElementById("ctad3-qr-image");

    const qrNumber = document.getElementById("ctad3-qr-number");


    function isTouchDevice() {

        return (

            'ontouchstart' in window ||

            navigator.maxTouchPoints > 0 ||

            navigator.msMaxTouchPoints > 0

        );

    }


    telLinks.forEach(link => {

        link.addEventListener("click", function (e) {

            if (!isTouchDevice()) {

                e.preventDefault();

                const rect = this.getBoundingClientRect();

                const phoneNumber = this.getAttribute("href").replace("tel:", "");


                qrImage.src =

                    `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=tel:${phoneNumber}`;

                qrNumber.textContent = phoneNumber;


                popup.style.left = rect.left + "px";

                popup.style.top = rect.bottom + window.scrollY + "px";


                popup.classList.add("ctad3-active");

            }

        });

    });


    document.querySelector(".ctad3-close").onclick = () =>

        popup.classList.remove("ctad3-active");


    document.addEventListener("click", function(e){

        if(!popup.contains(e.target) &&

           !e.target.closest('a[href^="tel:"]'))

        {

            popup.classList.remove("ctaf2-active");

        }

    });

});



