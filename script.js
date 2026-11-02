
const talks = [
    // Add your talks here, for example:
    // {
    //     date: "2027-02-15",
    //     title: "Title of My Talk",
    //     place: "University or Conference",
    //     url: "https://example.com"
    // }
];

$(document).ready(function(){

    const now = new Date();

    const upcomingTalks = talks
        .filter(talk => new Date(talk.date + "T23:59:59") >= now)
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(0, 3);

    if (upcomingTalks.length > 0) {

        const $image = $(".header__image");

        $image.wrap('<div class="header__top"></div>');

        const $section = $('<section class="header__talks"></section>');

        $section.append(
            '<h3 class="header__talks-heading">Upcoming Talks</h3>'
        );

        upcomingTalks.forEach(function(talk) {

            const date = new Date(talk.date + "T12:00:00");

            const formattedDate = date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric"
            });

            const $entry = $('<div class="header__talk"></div>');

            $entry.append(
                $("<time></time>")
                    .attr("datetime", talk.date)
                    .text(formattedDate)
            );

            const $title = talk.url
                ? $('<a class="header__talk-title"></a>')
                    .attr("href", talk.url)
                    .text(talk.title)
                : $('<strong class="header__talk-title"></strong>')
                    .text(talk.title);

            $entry.append($title);

            $entry.append(
                $('<span class="header__talk-place"></span>')
                    .text(talk.place)
            );

            $section.append($entry);
        });

        $image.after($section);
        $(".header").addClass("header--has-talks");
    }

    AOS.init({
        once: true,
        offset: 20
    });

});
