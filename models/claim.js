var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/*
 * The bread and butter of WikiLogic!
 * A published claim may not have it's description edited.
 * A published claim may not be deleted. (should we create thie ability for super-admins? (should we create super-admins?))
 * flags determin if something has been noted as wrong or missing - need to determin a list of letters to use and what they mean.
 */

var claimSchema = mongoose.Schema({
    description: {
        type: String,
        default: '',
        required: 'Please fill Statement name',
        trim: true
    },
    axiom: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: false
    },
    flags: {
        type: String,
    },
    supporting: [{
            type: Schema.ObjectId,
            ref: 'Argument'
    }],
    opposing: [{
            type: Schema.ObjectId,
            ref: 'Argument'
    }],
    usedIn: [{
            type: Schema.ObjectId,
            ref: 'Argument'
    }],
    meta: {
        author: {
            type: Schema.ObjectId,
            ref: 'User'
        },
        created: {
            type: Date,
            default: Date.now
        },
        statusChangeCount: Number,
        viewCount: Number

    }
});

/* Evaluation methods 
 * 
=========================================================================*/

/* If there isn't a date, set the creation date to now! */
claimSchema.pre('save', function (next) {
  if (!this.meta.created) this.meta.created = new Date;
  next();
})

// Check groups to see if the statement is true
claimSchema.methods.evaluate = function() {
    //
    return true;
};



/* creates a model and exports it for the app to use */
module.exports = mongoose.model('Claim', claimSchema);