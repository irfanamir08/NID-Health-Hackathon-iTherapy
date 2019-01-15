<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Therapy Entity
 *
 * @property string $id
 * @property string $user_id
 * @property string $typeOfInjury
 * @property \Cake\I18n\FrozenTime $startingDate
 * @property string $name
 * @property \Cake\I18n\FrozenTime $DOB
 * @property string $gender
 * @property int $age
 * @property string $medID
 *
 * @property \CakeDC\Users\Model\Entity\User $user
 * @property \App\Model\Entity\Session[] $sessions
 */
class Therapy extends Entity
{

    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * Note that when '*' is set to true, this allows all unspecified fields to
     * be mass assigned. For security purposes, it is advised to set '*' to false
     * (or remove it), and explicitly make individual fields accessible as needed.
     *
     * @var array
     */
    protected $_accessible = [
        'user_id' => true,
        'typeOfInjury' => true,
        'startingDate' => true,
        'name' => true,
        'DOB' => true,
        'gender' => true,
        'age' => true,
        'medID' => true,
        'user' => true,
        'sessions' => true
    ];
}
