# volunteer

constituent - one record for each person
_id - string to hold unique id, let mongo generate it.
type - admin, volunteer, ???
status - active, inactive, deceased, 
pin - sign in pin
phone - string (use for MFA?)
name - first, last
place - google addresss object. includes lat and lon for mileage calculation.
last login date
logins - count of logins
custom locations - array of locations (title, lat, lng) ids, only show these for that person.
custom activities - array of custom activities

constituent hours - one record for each person
_id - string, same value as their constituent record.
hours - array of {day, event, in, out, duraction (calculate), location id, mileage (calculate)}


locations - one record for each location
id - string to hold unique id, let mongo generate it.
status - active, inactive, archived
lat and lng
title - name for that location.
custom - boolean, if custom don't normally display it.

settings -
activities - array of standard activities (name)


events
title
description
type - open, private
status - draft, open (for signup), closed (for signup), inprocess, complete, cancelled
start - day and time
end - day and time
days - array of needs by day
needs - array of location ids where volunteers are needed along with the quantity
participants - array of constituent ids and/or organization ids.

organizations - one record for each organization
title
description
members - array of constituent ids
events - array of events
donation - amount and array of items (title, quantity, value)


Future, move authentication to beginning, save user and auth in cookie, use API to authenticate to keep pins hidden, move contituent authentication to a different MongoDB collection.