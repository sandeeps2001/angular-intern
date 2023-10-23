import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invite } from '../invites';
import { Channels } from '../channels';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../post';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getInvites(): Observable<Invite[]>{
    const getInvitesURL = `${environment.apiURL}/invites/`

    return this.http.get<Invite[]>(
      getInvitesURL
    )
  }

  createInvites(invite: Invite): Observable<Invite>{
    const createInvitesURL = `${environment.apiURL}/invites/`

    return this.http.post<Invite>(
      createInvitesURL,
      invite
    )
  }

  updateInvites(invite: Invite): Observable<Invite>{
    const updateInviteURL = `${environment.apiURL}/invites/${invite._id}`

    console.log('Within Service',invite.name)

    return this.http.patch<Invite>(
      updateInviteURL,
      {
        name: invite.name,
        email: invite.email,
        channels: invite.channels,
        permissions: invite.permissions
      }
    )
  }

  getChannels(): Observable<Channels[]>{
    const getChannelsURL = `${environment.apiURL}/channels/`

    return this.http.get<Channels[]>(
      getChannelsURL
    )
  }

  createChannel(channel: Channels): Observable<Channels>{
    const createChannelURL = `${environment.apiURL}/channels/`

    return this.http.post<Channels>(
      createChannelURL,
      channel
    )
  }

  deleteChannel(channelId: string){
    const deleteChannelURL = `${environment.apiURL}/channels/${channelId}`

    return this.http.delete(
      deleteChannelURL
    )
  }

  getPosts(channelId: string): Observable<Post[]>{
    const getPostsURL = `${environment.apiURL}/posts/${channelId}/all`

    return this.http.get<Post[]>(
      getPostsURL
    )
  }

  createPosts(post: Post): Observable<Post>{
    const createPostsURL = `${environment.apiURL}/posts/`

    return this.http.post<Post>(
      createPostsURL,
      post
    )
  }

  updatePosts(post: Post): Observable<Post>{
    const updatePostsURL = `${environment.apiURL}/posts/${post._id}`

    return this.http.patch<Post>(
      updatePostsURL,
      post
    )
  }

  deletePosts(channelId: string): Observable<Post>{
    const deletePostsURL = `${environment.apiURL}/posts/${channelId}`

    return this.http.delete<Post>(
      deletePostsURL
    )
  }

  getPermissions(): Observable<Array<any>>{
    const getPermissionsURL = `${environment.apiURL}/invites/permissions`

    return this.http.get<Array<any>>(
      getPermissionsURL
    )
  }
}
