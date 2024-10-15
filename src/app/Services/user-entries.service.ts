import {EventEmitter, Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Parse} from 'parse';

@Injectable({
  providedIn: 'root'
})
export class UserEntriesService {

  constructor() { }

  eventsSubject: Subject<void> = new Subject<void>();
  async getEntries() {
    var Entry = Parse.Object.extend("UserEntries");
    var query = new Parse.Query(Entry);
    query.equalTo('user', Parse.User.current());
    console.log("here");
    var results = [];
    try {
      results = await query.find();
      console.log(JSON.stringify(results));
      console.log("here2")
    } catch (error) {
      console.log(`Error: ${JSON.stringify(error)}`);
    }
    return results
  }
  async getEntriesByCategory(cat) {
    console.log("In Service");
    var Entry = Parse.Object.extend("UserEntries");
    var query = new Parse.Query(Entry);
    query.equalTo('user', Parse.User.current());
    query.equalTo('category', cat);
    console.log("here");
    var results = [];
    try {
      results = await query.find();
      console.log(JSON.stringify(results));
      console.log("here2")
    } catch (error) {
      console.log(`Error: ${JSON.stringify(error)}`);
    }
    return results
  }

  async addEntry(file, name, category) {
    var parseFile = await new Parse.File(file.name, file);
    var Entry = Parse.Object.extend("UserEntries");
    var newEnt = new Entry();
    newEnt.set("user", Parse.User.current());
    newEnt.set("category", category);
    newEnt.set("name", name);
    newEnt.set("image", parseFile);
    await newEnt.save();
  }

  async deleteEntry(ent) {
    ent.destroy().then(function(response) {
      console.log('Item '+ ent.get("name") + ' erased successfully' + "\n\n" + response);
    }).catch(function(response, error) {
      console.log('Error: '+ error.message);
    });
  }
}
