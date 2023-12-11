<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SelectedUser;
use App\Models\User;

class SelectedUserController extends Controller
{
    public function storeRandomUser(Request $request)
    {
        // Pridobi vse uporabnike iz baze
        $users = User::all();

        // Preveri, če obstajajo uporabniki v bazi
        if ($users->isEmpty()) {
            return redirect()->back()->with('status', 'V bazi ni uporabnikov.');
        }

        // Naključno izbere enega od uporabnikov
        $randomUser = $users->random();

        // Ustvari nov zapis v tabeli 'selected_users'
        $selectedUser = SelectedUser::create(['ime' => $randomUser->name]); // Uporabite ustrezno ime stolpca

        return response()->json(['message' => 'User selected', 'selectedUser' => $selectedUser], 201);
    }
}
