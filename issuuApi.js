        var iRequest =
            "http://api.issuu.com/1_0?action=issuu.documents.list&apiKey=owq32j1gea63hswaii7lzo8ma43nh9n0&access=public&documentSortBy=publishDate&resultOrder=desc&pageSize=30&format=json&signature=6b03703b7653b72c325f0ab5afb625fe";

        var eRequest = "http://api.issuu.com/1_0?action=issuu.document_embeds.list&apiKey=owq32j1gea63hswaii7lzo8ma43nh9n0&pageSize=30&embedSortBy=created&resultOrder=desc&responseParams=dataConfigId%2CdocumentId&format=json&signature=838e52edde9cadbb89b5197e4455f98c";

        $.get(iRequest, function(data) {
            $(data.rsp._content.result._content).each(function(index, doc) {
                // stuff to do for each document object (doc)

                $("#docsWrapper").append(`<div class="iThumb col-lg-4 col-md-4 col-sm-4 col-xs-12 text-center" data-id="${doc.document.documentId}" data-name="${doc.document.name}"><h4 class="docTitle">${doc.document.title}</h4><img class="docImage" src="https://image.issuu.com/${doc.document.documentId}/jpg/page_1_thumb_large.jpg"/></div>`);
            });
        });

        // this call gets embed config info to properly format URLs
        $.get(eRequest, function(eData) {
            var embedData = eData.rsp._content.result._content;
            $(".iThumb").each(function(index, block) {
                // stuff to do for each block of documents
                for (var i = 0; i < embedData.length; i++) {
                    if (embedData[i].documentEmbed.documentId === $(block).attr("data-id")) {
                        $(block).attr("data-embed", embedData[i].documentEmbed.dataConfigId)
                    }
                }
            });
            $(".iThumb").on("click", function() {
                window.location.href = `https://issuu.com/theislandpacket/docs/${$(this).attr("data-name")}?e=${$(this).attr("data-embed")}`;
            })
        });