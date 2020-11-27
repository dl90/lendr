export const initialState = {
    displayname:"",
    logintoken:null,
   
}
export const reducer = (state, action) => {
console.log("action", action);
    switch(action.type){
        case "ChangeDisplayName":
            return {
                ...state,
                displayname:action.displayname
            }
        default:
            return state;
    }
    
}