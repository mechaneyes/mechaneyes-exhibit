
  

# Mechaneyes: Portfolio 22SS

  

### [mechaneyes.com](http://mechaneyes.com/)

  

### GitHub repo: [mechaneyes-exhibit](https://github.com/rayweitzenberg/mechaneyes-exhibit)

  
  
  

<br  />

<br  />

  

## Inspiration: Start w the Map
https://www.newyorker.com/books/page-turner/start-with-the-map

The article is a gem. Here are bits, but they don't do the essay any real justice. Just go and read it yourself.

> Scenes (or suites of scenes) need spaces to happen in. What those spaces look like, and what is in them, can determine how the action unfolds. They can even give you ideas for what unfolds. This is why mapmaking and stage-sketching can be necessary aspects of writing.

> Another map-fiction relationship is one in which the map itself becomes the blueprint for the fiction, so that, once you’ve worked out your map, the section of the story it depicts is pretty much plotted out.

#### SPOILER ... The last lines of the essay:

>It’s a magnificent farrago of best guesses, classical locations, Biblical myth, and not a lot of sea. As a navigational tool, the Mappa Mundi would clearly be a dead loss. As a map of the medieval mind, however, it has few peers. I wonder if that isn’t the point about maps of fictitious places, too? They are maps of minds. You lose yourself in them and find if not factual truth, then other kinds. You meditate upon them. You meet yourself in them. You co-opt them and set stories of your own there, or fragments of stories, at least. Fictitious maps give form to a thing—the imagination—that has no form. They are mysteries and answers to those mysteries.

  
  
  

<br  />

<br  />

  

## Taxonomy

  

  

### Ski Resorts and their Mountains

  

  

  

The taxonomy I've employed is based on ski resorts near Lake Tahoe and the mountains they're built upon. Each interest of mine is defined by a resort, and the projects within interests rest at the peaks of those mountains.

This approach doesn't make sense for mobile as the screen's just too small for this type of content. So I've built the collections into parts of the same map, but arranged much closer together. The presentation is decent.

  

<br  />

<br  />

  

## Navigation/Interaction

  

  

  

To navigate the site I'm using Mapbox GL JS' built-in [cluster](https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/#geojson-cluster) functions to visualize points in a [circle layer](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#circle) as clusters.

  

  

  

For customizing and styling the clusters themselves I'm basing my work on this example: [Set Mapbox cluster icons based on cluster contents](https://medium.com/@droushi/mapbox-cluster-icons-based-on-cluster-content-d462a5a3ad5c)

  

  

  

General clustering was based on this example: [Create and style clusters](https://docs.mapbox.com/mapbox-gl-js/example/cluster/)


Again, the clustering just didn't lend itself well to mobile. I've made a drastic departure from the concept used on desktop.

  

<br  />

<br  />

  

## Data

  

Mountain peaks pinpointed using [Peakbagger.com](https://www.peakbagger.com/Default.aspx)

  
  

<br  />

<br  />

  

## Design

  

  

  

### [Why You Should Avoid Vibrating Color Combinations](https://webdesign.tutsplus.com/articles/why-you-should-avoid-vibrating-color-combinations--cms-25621)

  

  

  

![legibility](legibility.svg)

  

  

  

For color combinations I'm purposely employing colors that vibrate against each other. As the article above describes, these types of combinations are usually not encouraged. However I like the effect and as I'm using it sparingly so I'm actually happy with the output.

  

  

  

The first time I saw this vibration effect was at [Max Fish](https://maxfishbar.com/) on Orchard.

  

  

  

![max fish](max-fish.jpg)

  

  

<br  />

<br  />

  

## Notes

  

  

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).