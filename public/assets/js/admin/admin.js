toastr.options = {
    "positionClass": "toast-bottom-right"
};

window.ajax = {};
window.ajax.get = function(url,callback_success,callback_error) {
    $.ajax({
        type: "GET",
        url: url,
        success:function(data) {
            if (typeof callback_success !== 'undefined') {callback_success(data);}
        },
        error:function(data) {
            if (typeof data.responseJSON !== 'undefined' && typeof data.responseJSON.error !== 'undefined') {
                toastr.error(data.responseJSON.error)
            } else if (typeof data.responseJSON !== 'undefined' && typeof data.responseJSON.message !== 'undefined') {
                toastr.error(data.responseJSON.message)
            }
            if (typeof callback_error !== 'undefined') {callback_error(data);}
        }
    });
}
window.ajax.post = function(url,data,callback_success,callback_error) {
    $.ajax({
        type: "POST",
        url: url,
        contentType: "application/json",
        data: JSON.stringify(data),
        success:function(data) {
            toastr.success("Created Successfully")
            if (typeof callback_success !== 'undefined') {callback_success(data);}
        },
        error:function(data) {
            toastr.error("An Error Occurred During Creation")
            if (typeof data.responseJSON !== 'undefined' && typeof data.responseJSON.error !== 'undefined') {
                toastr.error(data.responseJSON.error)
            } else if (typeof data.responseJSON !== 'undefined' && typeof data.responseJSON.message !== 'undefined') {
                toastr.error(data.responseJSON.message)
            }
            if (typeof callback_error !== 'undefined') {callback_error(data);}
        }
    });
}
window.ajax.put = function(url,data,callback_success,callback_error) {
    $.ajax({
        type: "PUT",
        url: url,
        contentType: "application/json",
        data: JSON.stringify(data),
        success:function(data) {
            toastr.success("Updated Sucessfully")
            if (typeof callback_success !== 'undefined') {callback_success(data);}
        },
        error:function(data) {
            toastr.error("An Error Occurred During Update")
            if (typeof data.responseJSON !== 'undefined' && typeof data.responseJSON.error !== 'undefined') {
                toastr.error(data.responseJSON.error)
            } else if (typeof data.responseJSON !== 'undefined' && typeof data.responseJSON.message !== 'undefined') {
                toastr.error(data.responseJSON.message)
            }
            if (typeof callback_error !== 'undefined') {callback_error(data);}
        }
    });
}
window.ajax.delete = function(url,data,callback_success,callback_error) {
    $.ajax({
        type: "DELETE",
        url: url,
        contentType: "application/json",
        data: JSON.stringify(data),
        success:function(data) {
            toastr.success("Deleted Sucessfully")
            if (typeof callback_success !== 'undefined') {callback_success(data);}
        },
        error:function(data) {
            toastr.error("An Error Occurred During Deletion")
            if (typeof data.responseJSON !== 'undefined' && typeof data.responseJSON.error !== 'undefined') {
                toastr.error(data.responseJSON.error)
            } else if (typeof data.responseJSON !== 'undefined' && typeof data.responseJSON.message !== 'undefined') {
                toastr.error(data.responseJSON.message)
            }
            if (typeof callback_error !== 'undefined') {callback_error(data);}
        }
    });
}

gform.prototype.options.autoFocus = false;
gform.types['identity']= _.extend({}, gform.types['combobox'], {

    toString: function(name,display){
      if(!display){
        if(typeof this.combo !== 'undefined'){
          return '<dt>'+this.label+'</dt> <dd>'+(this.combo.value||'(empty)')+'</dd><hr>'
        }else{
            // console.log(this.get());
          return '<dt>'+this.label+'</dt> <dd>'+(this.get()||'(empty)')+'</dd><hr>'
        }
      }else{
        if(typeof this.options !== 'undefined' && this.options.length){
          return _.find(this.options,{id:parseInt(this.value)})||this.value;
        }else{
          return this.value;
        }
      }
    },
    defaults:
        {
            strict:true,
            search:"/api/identities/search/{{search}}{{value}}",
            format:
                {
                    title:'{{{label}}}{{^label}}Identity{{/label}} <span class="text-success pull-right">{{value}}</span>',
                    label:"{{first_name}}{{#last_name}} {{last_name}}{{/last_name}}",
                    value:function(item){
                        return item.id;
                    },
                    display:'{{first_name}} {{last_name}}<div style="color:#aaa">{{default_username}}</div><div style="color:#aaa">{{unique_id}}</div>'
                }
        }
  })

// // Automatically cancel unfinished ajax requests 
// // when the user navigates elsewhere.
// (function($) {
//     var xhrPool = [];
//     $(document).ajaxSend(function(e, jqXHR, options){
//         xhrPool.push(jqXHR);
//     });
//     $(document).ajaxComplete(function(e, jqXHR, options) {
//         xhrPool = $.grep(xhrPool, function(x){return x!=jqXHR});
//     });
//     var abort = function() {
//         $.each(xhrPool, function(idx, jqXHR) {
//             jqXHR.abort();
//         });
//     };
//     var oldbeforeunload = window.onbeforeunload;
//     window.onbeforeunload = function() {
//         abort();
//         return oldbeforeunload ? oldbeforeunload() : undefined;
//     }
// })(jQuery);