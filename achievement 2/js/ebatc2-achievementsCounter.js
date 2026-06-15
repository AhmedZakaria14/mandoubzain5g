document.addEventListener("DOMContentLoaded", () => {
    // جلب قسم العدادات والأرقام نفسها
    const ebatc2_section = document.getElementById("ebatc2-counter-section");
    const ebatc2_counters = document.querySelectorAll(".ebatc2-count-number");

    // إعدادات المراقب
    const ebatc2_observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.3 // يبدأ العمل عندما يظهر 30% من القسم
    };

    // مراقب التقاطع Intersection Observer
    const ebatc2_observer = new IntersectionObserver((ebatc2_entries, ebatc2_obs) => {
        ebatc2_entries.forEach(ebatc2_entry => {
            if (ebatc2_entry.isIntersecting) {
                // تفعيل العد لجميع البطاقات داخل القسم
                ebatc2_counters.forEach(ebatc2_counter => {
                    const ebatc2_target = parseInt(ebatc2_counter.getAttribute("data-ebatc2-target"));
                    ebatc2_startCounting(ebatc2_counter, 0, ebatc2_target, 2000); // 2000 هي مدة الأنيميشن بالميللي ثانية
                });

                // إيقاف المراقبة بعد التشغيل الناجح لمرة واحدة
                ebatc2_obs.unobserve(ebatc2_section);
            }
        });
    }, ebatc2_observerOptions);

    // تفعيل المراقب على القسم الأساسي
    if (ebatc2_section) {
        ebatc2_observer.observe(ebatc2_section);
    }

    // دالة العد السلسة المتجاوبة باستخدام requestAnimationFrame
    function ebatc2_startCounting(ebatc2_element, ebatc2_start, ebatc2_end, ebatc2_duration) {
        let ebatc2_startTimestamp = null;

        const ebatc2_step = (ebatc2_timestamp) => {
            if (!ebatc2_startTimestamp) ebatc2_startTimestamp = ebatc2_timestamp;
            
            // حساب نسبة التقدم (تتراوح بين 0 و 1)
            const ebatc2_progress = Math.min((ebatc2_timestamp - ebatc2_startTimestamp) / ebatc2_duration, 1);
            
            // تغيير الرقم داخل العنصر
            ebatc2_element.textContent = Math.floor(ebatc2_progress * (ebatc2_end - ebatc2_start) + ebatc2_start);
            
            // إذا لم تنتهِ المدة، استمر في الاستدعاء
            if (ebatc2_progress < 1) {
                window.requestAnimationFrame(ebatc2_step);
            } else {
                // ضمان الوصول للرقم النهائي الدقيق بدون كسور
                ebatc2_element.textContent = ebatc2_end;
            }
        };

        window.requestAnimationFrame(ebatc2_step);
    }
});