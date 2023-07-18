# Val Town 
This is a simple Raycast extension that allows one to fetch information about Vals from val.town using their new API. All that you need to bring is a val.town API key. 

Currently there are two commands:

- Fetch Val by Name (requires both username and val name to be input - uses the `/alias/:username/:val_name` endpoint)
- Fetch Val by ID (requires a val's unique ID to be input - uses the `/vals/:val_is` endpoint)
- Create a Val (opens val.new)

You can also open vals directly on Val Town and copy or open directly the run and express endpoints for vals. 

## Ideas for future enhancements
- Better presentation of the API response (not just formatted JSON)
- The ability to run vals locally
- Default username to use in Fetch Val by Name

## Inspiration 
- [Val Town Raycast Extension](https://github.com/pomdtr/val-town-raycast-extension) by [pomdtr](https://github.com/pomdtr)
