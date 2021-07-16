import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPage } from '../../actions';
import './PaginationBar.css';


export default function PaginationBar() {
    const CountrySearch = useSelector((state) => state.CountrySearch);
    const dispatch = useDispatch();
    function handleSubmit(e) {
        e.preventDefault()
    }
    function getNum(num) {
        return ()=>{
            dispatch(getPage(num));
        }
    }
    function prev() {
        dispatch(getPage(parseInt(CountrySearch.resultSearch.ActualPage)-1));
    }
    function next() {
        dispatch(getPage(parseInt(CountrySearch.resultSearch.ActualPage)+1));
    }
    let TotalPages= parseInt(CountrySearch.resultSearch.numberPages)
    let Bottons = []
    for (let page = 1; page <= TotalPages ; page++) {
        if (parseInt(CountrySearch.resultSearch.ActualPage) === page){
            Bottons.push(<label className="button-num-actual" onClick={getNum(page)} key={page}>{page}</label>)
        } else {
            Bottons.push(<label className="button-num" onClick={getNum(page)} key={page}>{page}</label>)
        }
    }

    return(
        <div className="border-pagination">
            <form onSubmit={handleSubmit}>
                <div>
                    {parseInt(CountrySearch.resultSearch.ActualPage) > 1?
                    (<label onClick={prev} className="button-num">previous</label>):
                    (<label></label>)}
                    {Bottons.map((boton)=>{return boton})}
                    {parseInt(CountrySearch.resultSearch.ActualPage) < parseInt(CountrySearch.resultSearch.numberPages)?
                    (<label className="button-num" onClick={next}>next</label>):
                    (<label></label>)}
                </div>
            </form>
        </div>
    )
};