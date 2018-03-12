/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    //This suite is all about the RSS feeds definitions, the allFeeds variable in our application.
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.*/
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        // This test loops through each feed in the allFeeds object and ensures it has a URL defined
        //and that the URL is not empty.
        it('url defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBeNull();
            });
        }); 

        // This test loops through each feed in the allFeeds object and ensures it has a name defined
        //and that the name is not empty.
        it('name defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBeNull();
            });
        });  
    });


    // A new test suite named "The menu"
    describe('The menu', function() {

        // A test that ensures the menu element is hidden by default.
        let body = $('body');
        it('should be hidden by default', function() {
            expect(body.hasClass('menu-hidden')).toBe(true);
        }); 

        // A test that ensures the menu changes visibility when the menu icon is clicked.
        //expectation to display menu when list icon is clicked
        let listIcon = $('.icon-list');
        it('should display menu when list icon is clicked', function() {
            listIcon.click();
            expect(body.hasClass('menu-hidden')).not.toBeTruthy();
        });

        //expectation to hide menu when list icon is clicked on again
        it('should hide menu when list icon is clicked again', function() {
            listIcon.click();
            expect(body.hasClass('menu-hidden')).toBeTruthy();
        });
    });

    // A new test suite named "Initial Entries"
    describe('Initial Entries', function() {

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        // A test that ensures when the loadFeed function is called and completes its work, 
        // there is at least a single .entry element within the .feed container.
         let feed = $('.feed .entry');
         it('should have at least a single entry element within the .feed container when loadFeed function is called', function() {
            expect(feed.children.length > 0).toBeTruthy();
         });
    });

    // A new test suite named "New Feed Selection"
    describe('New Feed Selection', function() {
        let before, after;

        //beforeEach function to run before tests
        beforeEach(function(done) {
            //first result from feed
            loadFeed(0, function() {
                before = $('.feed').html();
            });

            //second result from feed
            loadFeed(1, function() {
                after = $('.feed').html();
                done();
            });
        });

        // A test that ensures when a new feed is loaded by the loadFeed function
        // that the content actually changes.
        it('ensure content changes when a new feed is loaded by loadFeed', function() {
            expect(before).not.toEqual(after);
        });
    });
}());
