
var uparrow = '↟';

var downarrow = '↡';

var VoteEnum = {
    UP: 0,
    DOWN: 1
};

function linkshare_repaint() {

  element_id.innerHTML = lsweb_draw_table(entries);
    
}

function local_upvote(title, url) {

    var n;

    if (entries == null) {
	return -1;
    }
    
    for (n = 0; n < entries.length; n++) {

	if ((true == (entries[n].title == title)) && ((true == (entries[n].url == url)))) {

	    var sortnum = parseInt(entries[n].sort, 16);
	    
	    if (sortnum < 16777215) {
		sortnum++;
	    }
	    
	    entries[n].sort = sortnum.toString(16);

	}
    
    }

    return 0;
    
}

function local_downvote(title, url) {

    var n;

    if (entries == null) {
	return -1;
    }
    
    for (n = 0; n < entries.length; n++) {

	if ((true == (entries[n].title == title)) && ((true == (entries[n].url == url)))) {

	    var sortnum = parseInt(entries[n].sort, 16);
	    
	    if (sortnum > 0) {
		sortnum--;
	    }
	    
	    entries[n].sort = sortnum.toString(16);

	}
    
    }

    return 0;
    
}

function send_upvote(title, url) {

    var request_obj = { vote: 'UP', title: title, url: url };

    console.log('Sending upvote for title ' + title + ' and link ' + url);
    
$.ajax({
  type: "POST",
  url: '/cgi-bin/linkshare_processor',
  data: JSON.stringify(request_obj),
  success: function(data, textStatus, jqXHR) {

      status_id.innerHTML = data;

}
});

    
}

function send_downvote(title, url) {

    var request_obj = { vote: 'DOWN', title: title, url: url };

    console.log('Sending downvote for title ' + title + ' and link ' + url);
    
$.ajax({
  type: "POST",
  url: '/cgi-bin/linkshare_processor',
  data: JSON.stringify(request_obj),
  success: function(data, textStatus, jqXHR) {

      status_id.innerHTML = data;

}
});

    
}

function add_clickqueue(clickval, title, url) {

    var vote_str = clickval == VoteEnum.UP ? 'upvote' : 'downvote';
    
    console.log('Adding ' + vote_str + ' to transfer queue.');

    switch(clickval) {
    case VoteEnum.UP: 
	send_upvote(title, url);
	local_upvote(title, url);
	break;
    case VoteEnum.DOWN:
	send_downvote(title, url);
	local_downvote(title, url);
	break;
    }

    linkshare_repaint();
	
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

    var javascript_uplink, javascript_downlink;

    javascript_uplink = 'javascript:add_clickqueue(VoteEnum.UP, \'' + entry.title + '\', \'' + entry.url + '\')';

    javascript_downlink = 'javascript:add_clickqueue(VoteEnum.DOWN, \'' + entry.title + '\', \'' + entry.url + '\')';    
    
    str += '<TR BGCOLOR="' + bgcolor + '"><TD COLSPAN="4"><A HREF="' + javascript_uplink + '">' + uparrow + '</A></TD></TR>';
    str += '<TR BGCOLOR="' + bgcolor + '"><TD>&nbsp;</TD><TD COLSPAN="3"><a href="' + entry.url + '">' + entry.title + '</a></TD></TR>';
    str += '<TR BGCOLOR="' + bgcolor + '"><TD COLSPAN="2"><A HREF="' + javascript_downlink + '">' + downarrow + '</A></TD>';

    if (entry.sort) str += '<TD ALIGN="RIGHT">Votes:</TD><TD>' + parseInt(entry.sort, 16) + '</TD>';
    else str += '<TD COLSPAN="2">&nbsp;</TD>';
    
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

