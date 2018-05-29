/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    describe('RSS Feeds', function () {
        /*
         * a test to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /*
         * a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('allFeeds has url and not empty', function () {
            for (var feed of allFeeds) {
                expect(feed.url).toBeTruthy();
            }
        });

        /*
         * a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('allFeeds has name and not empty', function () {
            for (var feed of allFeeds) {
                expect(feed.name).toBeTruthy();
            }
        });
    });


    describe('The menu', function () {
        /*
         * a test that ensures the menu element is
         * hidden by default.
         */
        it('hidden by default', function () {
            var body = document.getElementsByTagName('body')[0];
            var isHidden = body.classList.contains('menu-hidden');

            expect(isHidden).toBe(true);
        });

        /*
         * a test that ensures the menu changes
         * visibility when the menu icon is clicked.
         */
        it('visibility changes by click', function () {
            var menuIcon = $('.menu-icon-link')[0];
            menuIcon.click();
            var body = document.getElementsByTagName('body')[0];
            expect(body.classList.contains('menu-hidden')).toBe(false);
            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
    });


    describe('Initial Entries', function () {
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        /*
         * a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('completed its call and have entries', function () {
            var feed = document.getElementsByClassName('feed')[0];
            expect(feed.children.length).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection', function () {
        var feed1, feed2;

        beforeEach(function (done) {
            loadFeed(0, function () {
                feed1 = document.getElementsByClassName('feed')[0].innerHTML;
                loadFeed(1, function () {
                    done();
                });
            });
        });

        /* a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        it('should change the loaded feeds content', function (done) {
            feed2 = document.getElementsByClassName('feed')[0].innerHTML;
            expect(feed2).not.toBe(feed1);
            done();
        });
    });
}());
