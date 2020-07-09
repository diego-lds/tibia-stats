import { ListItemSecondaryAction } from "@material-ui/core";

export default str => {
    if (!str) return;
    let initialIndex = str.indexOf('[[')
    if (initialIndex > -1) {
        let result = [];
        result = str
            .split(']]')
            .map(item => {
                let idx = item.indexOf('[[')
                if (idx > -1) {
                    return item.substring(idx + 2, item.lenght)
                }
            })
            .filter(item => item && item.length > 0)
            .join(', ')
        return result
    }
}