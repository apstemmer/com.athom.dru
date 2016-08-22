'use strict';
function init() {

  Homey.manager('flow').on('action.light_switch', (callback, args)=>{
    console.log(args);
    Homey.manager('drivers').getDriver('dru').capabilities.light.set(args.device,args.toggle,(err,status)=>{
        if (err) return callback(err);
        console.log(`setting ${args.toggle}!`, status);
	      callback(null,status);
    });
  });

	Homey.manager('flow').on('condition.light_status',(callback, args) =>{
		console.log(args);
		Homey.manager('drivers').getDriver('dru').capabilities.light.get(args.device,(err,status)=>{
        if(err){
          return callback(err);
        }else if(status === 'on'){
            return callback(null, true);
        }else if(status === 'off'){
            return callback(null, false);
        }
    });
	});
  Homey.manager('flow').on('condition.room_temp',(callback, args)=>{
    console.log(args);
    Homey.manager('drivers').getDriver('dru').capabilities.temp.get(args.device,(err, temp)=>{
      console.log(err, temp);
      if(err){
        return callback(err);
      }else if(args.temp_rel === 'larger' && temp > args.temp_set){
        return callback(null,true);
      }else if(args.temp_rel === 'smaller' && temp < args.temp_set){
        return callback(null,true);
      }else if(args.temp_rel === 'equal' && temp === args.temp_set){
        return callback(null, true);
      }
      return callback(null, false);

    });
  });
}

module.exports.init = init;
