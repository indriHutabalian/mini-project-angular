import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, XHRBackend, RequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { users } from './users';
import { User } from '../model/user';

function userBackendFactory(backend: MockBackend, options: BaseRequestOptions, realBackend: XHRBackend) {

    // first, get data users from the local storage or initial data array
    let data: User[] = JSON.parse(localStorage.getItem('users')) || users;

    // configure fake backend
    backend.connections.subscribe((connection: MockConnection) => {
        // wrap in timeout to simulate server api call
        setTimeout(() => {
            // get all user
            if (connection.request.url.endsWith('/user-backend/users') &&
                connection.request.method === RequestMethod.Get) {
                connection.mockRespond(new Response(new ResponseOptions({
                    status: 200,
                    body: data
                })));

                return;
            }

            // Login
            if (connection.request.url.endsWith('/user-backend/login') &&
                connection.request.method === RequestMethod.Post) {
                let receivedEmployee = JSON.parse(connection.request.getBody());
                let loginValid = false;
                let userLogin: any;

                data.some((element: User, index: number) => {
                    if (element.username === receivedEmployee.username && element.password === receivedEmployee.password) {
                        loginValid = true;
                        userLogin = data[index];
                        return true;
                    }
                });

                if (!loginValid) {
                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 400,
                        body: 'Username and Password was not found'
                    })));
                } else {
                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body: userLogin
                    })));
                }

                return;
            }

            // pass through any requests not handled above
            let realHttp = new Http(realBackend, options);
            let requestOptions = new RequestOptions({
                method: connection.request.method,
                headers: connection.request.headers,
                body: connection.request.getBody(),
                url: connection.request.url,
                withCredentials: connection.request.withCredentials,
                responseType: connection.request.responseType
            });
            realHttp.request(connection.request.url, requestOptions)
                .subscribe((response: Response) => {
                    connection.mockRespond(response);
                },
                    (error: any) => {
                        connection.mockError(error);
                    });
        }, 500);

    });

    return new Http(backend, options);
}

export let userBackendProvider = {
    // use user backend in place of Http service
    provide: Http,
    useFactory: userBackendFactory,
    deps: [MockBackend, BaseRequestOptions, XHRBackend]
};