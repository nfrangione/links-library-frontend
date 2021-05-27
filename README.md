# Welcome to Link's Library

## Zelda Breath Of The Wild API: https://gadhagod.github.io/Hyrule-Compendium-API/#/?id=category

### Minimum Viable Product (MVP)

- As a user I sign-up/login to my account
- As a user I can see all the entry items on a home page
- As a user I can select a entry item, which brings up show-more page, with the notes made about the item
- As a user I can Create, Edit, Delete a note on a particular entry item
- As a user I can maneuver to a my notes page that will display all the notes I've made

### Stretch Goals

- As a user I can filter the entry items by category
- As a user I can search through the entry items by name
- As a user I can select a note from my notes pages and it will bring me to the entry item's show page

## Models

- User:
  - Associations: 
    - has_many :user_notes
    - has_many :entry_items, through: :user_notes
  - Attributes:
    - id (int)
    - username (string)

- UserNote:
  - Associations: 
    - belongs_to :user
    - belongs_to :entry_item
  - Attributes:
    - id (int)
    - comment (text)
    - user_id (int)
    - entry_item_id (int)

- EntryItem:
  - Associations: 
    - has_many :user_notes
    - has_many :users, through: :user_notes
  - Attributes:
    - id (int)
    - name (string)
    - image (string)
    - category (string)
    - original_id (int)
