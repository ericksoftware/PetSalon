
$(document).ready(function() {
    const items = {
        fruits: ["Apple", "Banana", "Orange"],
        vegetables: ["Carrot", "Broccoli", "Spinach"]
    };

    $('#category').change(function() {
        const selectedCategory = $(this).val();

        $('#items').empty().append('<option value="">Select an Item</option>');

        if (selectedCategory && items[selectedCategory]) {
            items[selectedCategory].forEach(function(item) {
                $('#items').append(`<option value="${item.toLowerCase()}">${item}</option>`);
            });
        }
    });
    $('#dark-mode-toggle').click(function() {
        $('body').toggleClass('dark-mode');
    });
});