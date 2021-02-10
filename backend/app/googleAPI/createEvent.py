from pprint import pprint
from app.googleAPI.googleConnect import Create_Service

CLIENT_SECRET_FILE = '/Users/phillex/Documents/Programming/Uni/e-busisness-project-1/backend/app/googleAPI/desktop_client_secrets.json'
API_NAME = 'calendar'
API_VERSION = 'v3'
SCOPES = ['https://www.googleapis.com/auth/calendar']

def createEvent(event):

    service = Create_Service(CLIENT_SECRET_FILE, API_NAME, API_VERSION, SCOPES)

    result = service.events().insert(calendarId="primary", sendUpdates="all", body=event).execute()

    if result:
        return 'Event created: %s' % (event.get('htmlLink'))
    else:
        return 'error'

