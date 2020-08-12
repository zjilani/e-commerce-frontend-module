import React , {Component} from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import classes from './Products.module.css';
import StarRatingComponent from 'react-star-rating-component';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from 'axios';
import Filter from './Filter';

class Products extends Component {

    componentDidMount() {
        const formData = {
            mainCategory: this.props.match.params.main,
            subCategory: this.props.match.params.sub
        }
        this.props.getProducts(formData)
    }
    
    shouldComponentUpdate(nextProps,nextState){
        if(this.props.match.params !== nextProps.match.params){
            window.location.reload(false)
        }
        return true;
        
    }

    
    productHandler = () => {
        let products = []
        if(this.props.products){
            this.props.products.forEach( product => {
                
                let a = (
                    <div className={classes.Individual}>
                        <img  className={classes.pic} src={"https://ecommerce12.s3.ap-south-1.amazonaws.com/"+product.productFeatures.thumbnails[0]} alt={product.productFeatures.thumbnails[0]}/>
                        <p className={classes.Set}>{product.productFeatures.productName}</p>
                        <p className={classes.Set}>&#8377; {product.price}</p>
                        <p className={classes.Set}>
                            <StarRatingComponent 
                                name= "Rating"
                                editing={false}
                                starCount={5}
                                value={product.productFeatures.productRating}
                            />
                        </p>
                    </div>
                );
                products.push(a)
                
                
            })
        }
        else{
            let a=  (<p style={{textAlign: "center" , margin: "200px auto", fontSize: "xx-large"}}>
                        <b>NO PRODUCTS FOUND</b>
                    </p>);
            products.push(a)
        }
        return products
    }
    

    render() {
        var products = this.productHandler()
        return (
            <Aux>
            <span className={classes.PageName}>HOME/{this.props.match.params.main}/{this.props.match.params.sub}</span>
            <div className={classes.Display}>
                <div className={classes.Filter}>
                    <Filter params={this.props.match.params}/>
                </div>
                <div className={classes.Products}>
                    {products.length > 0 ? products : (<p style={{textAlign: "center" , margin: "200px auto", fontSize: "xx-large"}}>
                        <b>NO PRODUCTS FOUND</b>
                    </p>)}
                </div>
            </div>
            </Aux>

        );
    };
}

const mapStateToProps = state => {
    return {
        products: state.products.formData 
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getProducts : (params) => dispatch(actions.getFilteredProducts(params))
    };
};


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Products,axios));