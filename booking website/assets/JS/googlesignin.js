function signIn(){
    // Google's OAuth 2.0 endpoint for requesting an access token
  let oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

  // Create <form> element to submit parameters to OAuth 2.0 endpoint.
  let form = document.createElement('form');
  form.setAttribute('method', 'GET'); // Send as a GET request.
  form.setAttribute('action', oauth2Endpoint);

  // Parameters to pass to OAuth 2.0 endpoint.
  let params = {'client_id': '561479867362-oeds8n5l4m6sf5lor73h4c8114q411be.apps.googleusercontent.com',
                'redirect_uri': 'https://freshtime.netlify.app/pages/profile',
                'response_type': 'token',
                'scope':'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/cloud-platform.read-only',
                'include_granted_scopes': 'true',
                'state': 'pass-through value'};

  // Add form parameters as hidden input values.
  for (let p in params) {
    let input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', p);
    input.setAttribute('value', params[p]);
    form.appendChild(input);
  }

  // Add form to page and submit it to open the OAuth 2.0 endpoint.
  document.body.appendChild(form);
  form.submit();
}