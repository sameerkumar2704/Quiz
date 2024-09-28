export function ReplaceUrl(location){
    window.location.replace(`http://localhost:8080/${location}`)
}
export function PushNewUrl(location){
    window.location.href = `http://localhost:8080/${location}`
}
