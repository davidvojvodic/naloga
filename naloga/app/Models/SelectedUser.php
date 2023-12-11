<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SelectedUser extends Model
{
    use HasFactory;

    protected $fillable = ['ime'];


    protected $table = 'selected_users'; // Ime tabele v bazi
}
