const https = require('https');
const insert = require("../../src/DB/insert")
const requestByHttps = async (url)=>{
    return new Promise(async (resolve)=>{
         https.get(url,(res)=>{
                var html = "";
                if(res.statusCode===200){
                    res.on("data",(data)=>{
                        html+=data;
                    })
                    res.on('end',()=>{
                        resolve(html);
                    })
                }
         })
    }) 
 }
 const getData=async (url,collectionname,i)=>{
    const html = await requestByHttps(url);
    var obj = JSON.parse(html);
   insert("airbnb","airbnbNews",{
       msxx_listing_details:{
           photos:obj.pdp_listing_detail.photos,
           name:obj.pdp_listing_detail.name,
           bathroom_label:obj.pdp_listing_detail.bathroom_label,
           bedroom_label:obj.pdp_listing_detail.bedroom_label,
           guest_label:obj.pdp_listing_detail.guest_label,
           user:obj.pdp_listing_detail.user,
           else_description:obj.pdp_listing_detail.sectioned_description,
           listing_amenities:obj.pdp_listing_detail.listing_amenities,
           own_amenities:obj.pdp_listing_detail.see_all_amenity_sections,
           reviews:obj.pdp_listing_detail.sorted_reviews,
           analyse_appraise:[],
           computed_appraise_score:0,
           consumer_should_know:{},
           landlord_information:{},
           recommend_airbnb:[]
        }})
}
getData("https://www.airbnb.cn/api/v2/pdp_listing_details/27974323?_format=for_rooms_show&_p3_impression_id=p3_1581357544_zShN7gPk5EYkP92N&key=d306zoyjsyarp7ifhu67rjxn52tv0t20&")
