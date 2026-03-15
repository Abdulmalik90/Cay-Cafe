export function useGoogleReviews() {
    // لا سيرفر، لا تحميل، لا جوجل! بيانات ثابتة ومباشرة وفورية
    const data = {
        name: "كاي كافيه | Cay Cafe",
        rating: 4.3,
        user_ratings_total: 1626,
        reviews: [
        {
            author_name: "Bader",
            rating: 5,
            text: "المكان جمييييل والاطلالة اجممممل.. بجلسات ع البحر .. \nقهوة اليوم حلوووة .. وكيكة العسل لذيذذة ..\nالمكان بشكل عام يستحق الزيارة ..",
            profile_photo_url: "https://lh3.googleusercontent.com/a-/ALV-UjVzXIbNKuG68ABfiF9TZVialbkUSYfchRsIarlYnkIz4NGvena8=w72-h72-p-rp-mo-ba6-br100"
        },
        {
            author_name: "Dana Alshehri",
            rating: 5,
            text: "القهوة لذييذة جربت محصول ادهم، الجلسات نظيفة ومرتبه، الموظفين خلوقين، المكان فوق التقييم صراحة تجربة ممتازة 💯",
            profile_photo_url: "https://lh3.googleusercontent.com/a/ACg8ocLN6GqiRQTNT0Y0wIp-DKLKopTqm5C-7klo6Bt9RSKeKehJ5Q=w36-h36-p-rp-mo-ba3-br100"
        },
        {
            author_name: "Afnan",
            rating: 5,
            text: "اليوم جيت اجربه صراحه الكافي من داخل جداً جداً رايق ونظييف واجواءه هاديه عندهم كيكة عسل وسينابون خطيررره وطلبت v60 كان مره موزون وفنان حبيت اشكر الكاشير او الباريستا اتوقع اسمه حسن كان متعاون جدا وانا ساله عن القهوه و المحاصيل ،  يعطيه العافيه والاسعار تعتبر صراحه رهيبه وعندهم جلسات ع البحر والاطلاله تجننن",
            profile_photo_url: "https://lh3.googleusercontent.com/a-/ALV-UjWBo9cB20K0rTkY1yoKzrMtdCjY5ZCzF594-CDS-W3H9DeKUZy-=w36-h36-p-rp-mo-ba4-br100"
        }
        ]
    };

    // نرجع البيانات فوراً، ونجعل حالة التحميل دائماً false
    return { data, loading: false };
}