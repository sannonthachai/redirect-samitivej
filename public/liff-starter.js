const { ajax, AjaxRequest, AjaxResponse, AjaxError, AjaxTimeoutError } = rxjs.ajax
const { bufferCount, isEmpty, startWith, scan, concatMap, debounceTime,throttleTime,takeWhile, takeUntil, map, merge,pipe, take, skip, retryWhen, tap, delay, first, switchMap, mergeMap,exhaustMap, mapTo, catchError, finalize, filter, repeat,retry} = rxjs.operators

window.onload = function() {
    const liffId = "1653967927-1bRA3K3P";   // change the default LIFF value if you are not using a node server
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);
    const redirectURL = urlParams.get('liffRedirectUri')

    liff
    .init({
        liffId: liffId
    })
    .then(() => {
        if (!liff.isLoggedIn()) {
          liff.login();
        }

        if(liff.isLoggedIn()) {

            liff.getProfile().then((profile) => {

                let mid = profile.userId
                
                fetchAPI(redirectURL, mid)
                .pipe(
                    map(({response}) =>  response)
                )
                .subscribe(it => {
                    this.console.log(it)
                })

            }).catch(error => {
                console.error(error);
            })
        }
    }).catch((error) => {
        console.error(error);
    });
}

function fetchAPI(redirectURL, mid) {
    return ajax({
        method: "GET",
        url: `${redirectURL}?mid=${mid}`,
        headers: { 'Content-Type': 'application/json' },
    })
}