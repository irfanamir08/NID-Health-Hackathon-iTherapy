<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Session Entity
 *
 * @property string $id
 * @property string $therapy_id
 * @property int $sessionNum
 * @property int $accuracy
 * @property int $time
 * @property int $onTime
 *
 * @property \App\Model\Entity\Therapy $therapy
 */
class Session extends Entity
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
        'therapy_id' => true,
        'sessionNum' => true,
        'accuracy' => true,
        'time' => true,
        'onTime' => true,
        'therapy' => true
    ];
}
