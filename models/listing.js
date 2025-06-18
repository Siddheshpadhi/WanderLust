const mongoose = require("mongoose");
const wrapAsync = require("../utils/wrapAsync");
const Review = require("./review");
const user = require("./user");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: Object,
        url: {
            type: String,
            set: (v) => v === '' ? 'https://images.unsplash.com/photo-1512438925562-6b0f35961d77?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' : v,
            default: 'https://images.unsplash.com/photo-1512438925562-6b0f35961d77?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        filename: {
            type: String
        }
    },
    price: {
        type: Number
    },
    location: {
        type: String
    },
    country: {
        type: String
    },
    reviews: [
        {
            type:Schema.Types.ObjectId,
            ref:Review
        }
    ],
    owner: {
        type:Schema.Types.ObjectId,
        ref:user
    },
    geometry: {
        
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    category: {
        type: String,
        enum: ['trending','rooms','iconic cities','mountains','castles','amazing pools','camping','farms','arctic','play','boats']
    }
});

listingSchema.post("findOneAndDelete",wrapAsync(async  (data,next) => {
    if(data.reviews.length){
        await Review.deleteMany({ _id : {$in : data.reviews }});
    }
    console.log("deleted all the corresponding reviews also!");
    next();
}));

listingSchema.pre("save",function (next) {
    if(!this.image.url || this.image.url === '') this.image.url = 'https://images.unsplash.com/photo-1512438925562-6b0f35961d77?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    next();
});

const listing = mongoose.model("listing",listingSchema);

module.exports = listing;

