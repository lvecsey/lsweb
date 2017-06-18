
var uparrow = '↟';

var downarrow = '↡';

var VoteEnum = {
    UP: 0,
    DOWN: 1
};

function add_clickqueue(clickval) {

    var vote_str = clickval == VoteEnum.UP ? 'upvote' : 'downvote';
    
    console.log('Adding ' + vote_str + ' to transfer queue.');
    
}

function cmp_entries(a, b) {

    if (a.sort && b.sort) {

	if (a.sort < b.sort) return -1;
	if (a.sort > b.sort) return 1;
	return 0;
	
    }
    
    if (a.title < b.title) return -1;
    if (a.title > b.title) return 1;

    return 0;
    
}

function lsweb_show_entry(entry, bgcolor) {

    var str = '';

    str += '<TR BGCOLOR="' + bgcolor + '"><TD COLSPAN="3"><A HREF="javascript:add_clickqueue(VoteEnum.UP)">' + uparrow + '</A></TD></TR>';
    str += '<TR BGCOLOR="' + bgcolor + '"><TD>&nbsp;</TD><TD><a href="' + entry.url + '">' + entry.title + '</a></TD></TR>';
    str += '<TR BGCOLOR="' + bgcolor + '"><TD COLSPAN="3"><A HREF="javascript:add_clickqueue(VoteEnum.DOWN)">' + downarrow + '</A></TD>';

    if (entry.sort) str += '<TD ALIGN="RIGHT">Votes:</TD><TD>' + entry.sort + '</TD>';
    
    str += '</TR>';

    return str;
    
}

function lsweb_draw_table(entries) {

    var n;

    var str = '';

    var bgcolors = [ '#BBBBBB', '#CCCCCC' ];
    
    str += '<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="0">';

    for (n = 0; n < entries.length; n++) {

	str += lsweb_show_entry(entries[n], bgcolors[n%2]);

    }

    str += '</TABLE>';

    return str;

}

