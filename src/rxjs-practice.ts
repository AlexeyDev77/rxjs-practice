import { debounceTime, distinctUntilChanged, fromEvent, map, Observable} from "rxjs";

// const search$ = new Observable<Event>(observer => {
//   const search = document.getElementById('search');
//
//   if (!search) {
//     observer.error('Something went wrong!');
//     return;
//   }
//
//     search.addEventListener('input', event => {
//       observer.next(event)
//       // observer.complete();
//     })
//
// })


const search$: Observable<Event> = fromEvent<Event>(
  document.getElementById('search')!,
  'input',

)

search$.pipe(
  map(event => {
    return (event.target as HTMLInputElement).value
    }),
  debounceTime(500),
  map(value => value.length > 3 ? value : ''),
  distinctUntilChanged()
).subscribe( {
  next: value => console.log(value),
  error: err => console.log(err),
  complete: () => console.log('Complete')
})

