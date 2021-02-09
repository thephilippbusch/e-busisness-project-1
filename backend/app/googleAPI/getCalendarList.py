from pprint import pprint
from app.googleAPI.googleConnect import Create_Service
import datetime

CLIENT_SECRET_FILE = '/Users/phillex/Documents/Programming/Uni/e-busisness-project-1/backend/app/googleAPI/desktop_client_secrets.json'
API_NAME = 'calendar'
API_VERSION = 'v3'
SCOPES = ['https://www.googleapis.com/auth/calendar']

def getGoogleEvents():
    service = Create_Service(CLIENT_SECRET_FILE, API_NAME, API_VERSION, SCOPES)

    now = datetime.datetime.utcnow().isoformat() + 'Z'
    print('Getting the upcoming 10 events')
    events_result = service.events().list(calendarId='primary', timeMin=now,
                                        maxResults=10, singleEvents=True,
                                        orderBy='startTime').execute()
    events = events_result.get('items', [])

    if not events:
        return {'No upcoming events found.'}
    else:
        return events
