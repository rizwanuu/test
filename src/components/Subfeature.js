import React from 'react';
function Subfeature(props) {
    let myarr = props.value;
    let newArr = [];
    if (myarr !== undefined) {
        if (myarr.length > 0) {
            myarr.map((item, index) => {
                let node = <li>{item}</li>
                newArr.push(node);
            return (<div>
                <h5>{props.title}</h5>
                <ul>
                    {newArr}
                </ul>
                <hr />
            </div>)
            })
            return null;
        }
        else {
            return (
                <div></div>
            )
        }
    }
    else {
        return (
            <div></div>
        )
    }
}
export default Subfeature;