const fs = require('fs')
const https = require('https')
const async =require('async')
const insertOne = require('./insertOne')

var Method = {
    saveData:function(path, movies){
        fs.writeFile(path, JSON.stringify(movies, null, 4),{flag:'a+'}, function(err) {
            if (err) {
                return console.log(err);
            }
            console.log('Data saved');
        });
    },
    getJsonData:function(obj,collectionname,j){
        let homestay={};
        obj.explore_tabs[0].sections.forEach((data)=>{
            if(data.listings!=undefined){
                data.listings.forEach(async (data)=>{
                    let homestay={};
                    let datas=data.listing;
                    homestay.homestayDetail={};
                    homestay.homestayDetail.name=datas.name;
                    homestay.homestayDetail.pricing_quote=data.pricing_quote.rate;
                    homestay.homestayDetail.kicker_content=datas.kicker_content;
                    homestay.homestayDetail.picture_urls=datas.picture_urls;
                    homestay.homestayDetail.person_capacity=datas.person_capacity;
                    homestay.homestayDetail.picture_url=datas.picture_url;
                    homestay.homestayDetail.localized_city_name = datas.localized_city_name;
                    homestay.homestayDetail.wide_kicker_content=datas.wide_kicker_content;
                    homestay.homestayDetail.contentual_pictures=datas.contextual_pictures;
                    homestay.homestayDetail.emergency_message = datas.emergency_message;
                    homestay['_ID']=j;
                    console.log(j)
                    homestay['name']='广州荔湾';
                    /**
                     * @descript 参数 collectionname,data
                     */
                    j++;
                    await insertOne(collectionname,homestay)
                    
                })
            }
        })
        return homestay;
    }
}

exports = module.exports = Method;