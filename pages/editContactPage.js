import BasePage from './basePage';

class MainPage extends BasePage {
    constructor() {
        super();
        this.addNewButton = element(by.xpath('//*[text()="add new"]'));
        this.homeButton = element(by.xpath('//*[text()="home"]'));
        this.groupsButton = element(by.xpath('//*[text()="groups"]'));

        /* this.addnameBox = element(by.model('addName'));
        this.addButton = element(by.buttonText('+ add'));
        this.actualCount = $('em.ng-binding');
        this.deleteButton = $('i.icon-trash');
        this.deleteButtons = $$('i.icon-trash'); */
        //this.friendName = text => { return element.all(by.cssContainingText('td.ng-binding', text)); };
        // results...
       /*  this.rows = element.all(by.repeater('row in rows'));
        this.names = element.all(by.repeater('row in rows').column('{{row}}'));
 */
        this.url = '/';
        this.pageLoaded = this.inDom($('#container'));
    }

    /**
     * search for a friend
     * @param  {string} string
     * @return {promise}
     */
    searchFor(string) {
       return this.searchBox.sendKeys(string);
    }

    /**
     * add a friend
     * @param {string} name
     * @return {promise}
     */
    addFriend(name) {
        this.addnameBox.sendKeys(name);
        return this.addButton.click();
    }

    /**
     * delete a friend by name
     * @param  {string} nameString
     * @return {promise}
     */
    deleteFriend(nameString) {
        return this.rows.filter(row => {
            // find the row with the name we want...
            return row.$$('td').get(1).getText().then(name => {
                return name === nameString;
            });
        }).then(filteredRows => {
            filteredRows[0].$(this.deleteButton.locator().value).click();
        });
    }

    /**
     * find a friend in search results
     * @param {string} name - name to find
     * @return {bool}
     */
    inResults(name) {
        return this.friendName(name).then(found => {
            return found.length > 0;
        });
    }

    /**
     * delete all friends
     */
    deleteAllFriends() {
        this.deleteButtons.count().then(count => {
            while(count > 0) {
                this.deleteButtons.get(0).click();
                count--;
            }
        });
    }
}
export default new MainPage();