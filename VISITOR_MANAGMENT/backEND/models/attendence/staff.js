const mongoose = require("mongoose");

const attendenceSchema = new mongoose.Schema({
  uuid: {
    type: String,
  },
  month: {
    type: String,
    default: new Date().getMonth + 1,
  },
  year:{
    type:Number,
    default:new Date().getFullYear(),
  },
  attendence: {
    type: {
        day1: {
            type:{
                time : Date,
                late : Boolean,
            }
        },
        day2: {
            type:{
                time : Date,
                late : Boolean,
            }
        },
        day3: {
            type:{
                time : Date,
                late : Boolean,
            }
        },
        day4: {
            type:{
                time : Date,
                late : Boolean,
            }
        },
        day5: {
            type:{
                time : Date,
                late : Boolean,
            }
        },
        day6: {
            type:{
                time : Date,
                late : Boolean,
            }
        },
        day7: {
            type:{
                time : Date,
                late : Boolean,
            }
        },
        day8: {
            type:{
                time : Date,
                late : Boolean,
            }
        },
        day9: {
            type:{
                time : Date,
                late : Boolean,
            }
        },
        day10: {
            type:{
                time : Date,
                late : Boolean,
            }
        },
        day11: {
            type:{
                time : Date,
                late : Boolean,
            }
        },
        day12: {
            type:{
                time : Date,
                late : Boolean,
            }
        },
        day13: {
            type:{
                time : Date,
                late : Boolean,
            }
        },
        day14: {
            type:{
                time : Date,
                late : Boolean,
            }
        },
        day15: {
            type:{
                time : Date,
                late : Boolean,
            }
        },
        day16: {
            type:{
                time : Date,
                late : Boolean,
            }
        },
        day17: {
            type:{
                time : Date,
                late : Boolean,
            }
        },
        day18: {
            type:{
                time : Date,
                late : Boolean,
            }
        },
        day19: {
            type:{
                time : Date,
                late : Boolean,
            }
        },
        day20: {
            type:{
                time : Date,
                late : Boolean,
            }
        },
        day21: {
            type:{
                time : Date,
                late : Boolean,
            }
        },
        day22: {
            type:{
                time : Date,
                late : Boolean,
            }
        },
        day23: {
            type:{
                time : Date,
                late : Boolean,
            }
        },
        day24: {
            type:{
                time : Date,
                late : Boolean,
            }
        },
        day25: {
            type:{
                time : Date,
                late : Boolean,
            }
        },
        day26: {
            type:{
                time : Date,
                late : Boolean,
            }
        },
        day27: {
            type:{
                time : Date,
                late : Boolean,
            }
        },
        day28: {
            type:{
                time : Date,
                late : Boolean,
            }
        },
        day29: {
            type:{
                time : Date,
                late : Boolean,
            }
        },
        day30: {
            type:{
                time : Date,
                late : Boolean,
            }
        },
        day31: {
            type:{
                time : Date,
                late : Boolean,
            }
        }
    },
    default: {
        day1: {time:new Date(0),late:false},
        day2: {time:new Date(0),late:false},
        day3: {time:new Date(0),late:false},
        day4: {time:new Date(0),late:false},
        day5: {time:new Date(0),late:false},
        day6: {time:new Date(0),late:false},
        day7: {time:new Date(0),late:false},
        day8: {time:new Date(0),late:false},
        day9: {time:new Date(0),late:false},
        day10: {time:new Date(0),late:false},
        day11: {time:new Date(0),late:false},
        day12: {time:new Date(0),late:false},
        day13: {time:new Date(0),late:false},
        day14: {time:new Date(0),late:false},
        day15: {time:new Date(0),late:false},
        day16: {time:new Date(0),late:false},
        day17: {time:new Date(0),late:false},
        day18: {time:new Date(0),late:false},
        day19: {time:new Date(0),late:false},
        day20: {time:new Date(0),late:false},
        day21: {time:new Date(0),late:false},
        day22: {time:new Date(0),late:false},
        day23: {time:new Date(0),late:false},
        day24: {time:new Date(0),late:false},
        day25: {time:new Date(0),late:false},
        day26: {time:new Date(0),late:false},
        day27: {time:new Date(0),late:false},
        day28: {time:new Date(0),late:false},
        day29: {time:new Date(0),late:false},
        day30: {time:new Date(0),late:false},
        day31: {time:new Date(0),late:false}

    }
}

});

const Attendence = mongoose.model('Attendence',attendenceSchema);

module.exports = Attendence;